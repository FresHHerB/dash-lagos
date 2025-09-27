import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001;

// Detectar se está rodando no Bolt/produção
const isBolt = Boolean(process.env.BOLT_DEPLOYMENT || process.env.NODE_ENV === 'production');

// Lista em memória para armazenar todos os relatórios recebidos
let recebidos = [];

// Configuração do CORS
app.use(cors({
  origin: "*", // Em produção, restrinja aos domínios do seu front-end
  credentials: true,
  methods: ["*"],
  allowedHeaders: ["*"]
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Servir arquivos estáticos do build apenas em produção
if (isBolt) {
  const distPath = path.join(__dirname, '../dist');
  if (fs.existsSync(distPath)) {
    console.log('📁 Servindo arquivos estáticos do dist');
    app.use(express.static(distPath));
  }
}

// API Routes primeiro
/**
 * Ingestão de JSON via POST.
 */
app.post('/api/teste', async (req, res) => {
  try {
    let data = req.body;
    
    if (Array.isArray(data) && data.length > 0) {
      data = data[0];
    }

    recebidos.push(data);
    console.log('Dados recebidos:', JSON.stringify(data, null, 2));

    res.json({
      status: "success",
      message: "Dados recebidos e armazenados!",
      dados_recebidos: data,
    });
  } catch (error) {
    console.error('Erro ao processar dados:', error);
    res.status(500).json({
      status: "error", 
      message: error.message
    });
  }
});

/**
 * Retorna a lista de relatórios já recebidos.
 */
app.get('/api/relatorios', (req, res) => {
  try {
    console.log(`Retornando ${recebidos.length} relatórios armazenados`);
    
    // Sanitiza os dados para evitar problemas de serialização JSON
    const sanitizedData = recebidos.map(item => {
      try {
        // Tenta serializar cada item individualmente
        JSON.stringify(item);
        return item;
      } catch (error) {
        console.warn('Item com problema de serialização removido:', error.message);
        return null;
      }
    }).filter(item => item !== null);
    
    res.json(sanitizedData);
  } catch (error) {
    console.error('Erro ao retornar relatórios:', error);
    res.status(500).json({
      status: "error",
      message: "Erro ao processar relatórios armazenados",
      error: error.message
    });
  }
});

/**
 * Endpoint para limpar todos os relatórios armazenados
 */
app.delete('/api/relatorios', (req, res) => {
  const count = recebidos.length;
  recebidos = [];
  console.log(`${count} relatórios removidos`);
  res.json({
    status: "success",
    message: `${count} relatórios removidos com sucesso`
  });
});

/**
 * Endpoint para obter informações do servidor
 */
app.get('/api/server-info', (req, res) => {
  res.json({
    url: isBolt ? `https://${req.get('host')}` : `http://localhost:${PORT}`,
    status: isBolt ? 'production' : 'development',
    environment: isBolt ? 'bolt' : 'local'
  });
});

/**
 * Endpoint para obter estatísticas
 */
app.get('/api/status', (req, res) => {
  res.json({
    status: "online",
    relatorios_armazenados: recebidos.length,
    memoria_utilizada: process.memoryUsage(),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// SPA fallback apenas em produção
if (isBolt) {
  app.get('*', (req, res) => {
    const distPath = path.join(__dirname, '../dist');
    const indexPath = path.join(distPath, 'index.html');
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send(`
        <h1>Frontend não encontrado</h1>
        <p>Execute 'npm run build' primeiro.</p>
      `);
    }
  });
}

// Tratamento de erros global
app.use((error, req, res, next) => {
  console.error('Erro não tratado:', error);
  res.status(500).json({
    status: "error",
    message: "Erro interno do servidor"
  });
});

// Função para inicializar o servidor
async function bootstrap() {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📡 Endpoints locais:`);
  console.log(`   POST http://localhost:${PORT}/api/teste`);
  console.log(`   GET  http://localhost:${PORT}/api/relatorios`);
  console.log(`   GET  http://localhost:${PORT}/api/status`);
  console.log(`   DELETE http://localhost:${PORT}/api/relatorios`);
  
  if (isBolt) {
    console.log(`\n🌐 PRODUÇÃO: Endpoints públicos serão expostos pelo Bolt`);
  } else {
    console.log(`\n🎯 DESENVOLVIMENTO: Frontend rodando no Vite (porta 5173)`);
    console.log(`   Dashboard: http://localhost:5173`);
  }
}

// Iniciar o servidor
app.listen(PORT, () => {
  bootstrap();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});