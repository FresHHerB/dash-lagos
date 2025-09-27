import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { defaultReportData } from './default-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8001;

// Detectar se está rodando no Bolt/produção
const isBolt = Boolean(process.env.BOLT_DEPLOYMENT || process.env.NODE_ENV === 'production');

// Configuração de webhook (se definido no .env)
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const USE_DEFAULT_DATA = process.env.USE_DEFAULT_DATA !== 'false'; // Padrão é true em produção

// Lista em memória para armazenar todos os relatórios recebidos
let recebidos = [];

// Configuração do CORS
app.use(cors({
  origin: "*", // Em produção, restrinja aos domínios do seu front-end
  credentials: true,
  methods: ["*"],
  allowedHeaders: ["*"]
}));

// Middleware para trust proxy (importante para HTTPS)
app.set('trust proxy', true);

// Middleware para parsing JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Middleware para forçar HTTPS em produção (se necessário)
if (isBolt) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

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
 * POST /api/relatorios - Recebe novos relatórios
 */
app.post('/api/relatorios', async (req, res) => {
  try {
    let data = req.body;

    // Se recebermos um array, pegamos o primeiro item
    if (Array.isArray(data) && data.length > 0) {
      data = data[0];
    }

    // Validação básica da estrutura NewReportData
    if (!data || typeof data !== 'object') {
      return res.status(400).json({
        status: "error",
        message: "Dados inválidos. Esperado um objeto com estrutura de relatório."
      });
    }

    // Verificar se tem campos obrigatórios básicos
    if (!data.reportTitle || !data.executiveSummary) {
      return res.status(400).json({
        status: "error",
        message: "Dados incompletos. Campos obrigatórios: reportTitle, executiveSummary"
      });
    }

    // Adicionar timestamp
    data.receivedAt = new Date().toISOString();

    recebidos.push(data);
    console.log('📊 Relatório recebido:', data.reportTitle || 'Sem título');

    // Enviar webhook se configurado
    if (WEBHOOK_URL) {
      try {
        console.log('🔗 Enviando webhook para:', WEBHOOK_URL);
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            event: 'new_report_received',
            data: data,
            timestamp: new Date().toISOString(),
            server_info: {
              total_reports: recebidos.length,
              server_url: isBolt ? `https://${req.get('host')}` : `http://localhost:${PORT}`
            }
          })
        });
        console.log('✅ Webhook enviado com sucesso');
      } catch (webhookError) {
        console.error('❌ Erro ao enviar webhook:', webhookError.message);
        // Não falha a requisição se o webhook falhar
      }
    }

    res.json({
      status: "success",
      message: "Relatório recebido e armazenado com sucesso!",
      dados_recebidos: data,
      total_relatorios: recebidos.length,
      webhook_sent: !!WEBHOOK_URL
    });
  } catch (error) {
    console.error('❌ Erro ao processar relatório:', error);
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

/**
 * POST /api/teste - Mantido para compatibilidade (redireciona para /api/relatorios)
 */
app.post('/api/teste', async (req, res) => {
  console.log('⚠️  Endpoint /api/teste está deprecated. Use /api/relatorios');

  // Redirecionar para o novo endpoint
  req.url = '/api/relatorios';
  app._router.handle(req, res);
});

/**
 * GET /api/relatorios - Retorna a lista de relatórios armazenados
 */
app.get('/api/relatorios', (req, res) => {
  try {
    console.log(`📋 Retornando ${recebidos.length} relatórios armazenados`);

    // Sanitiza os dados para evitar problemas de serialização JSON
    const sanitizedData = recebidos.map((item, index) => {
      try {
        // Tenta serializar cada item individualmente
        JSON.stringify(item);
        return {
          ...item,
          id: index + 1, // Adiciona ID sequencial
          retrievedAt: new Date().toISOString() // Timestamp da consulta
        };
      } catch (error) {
        console.warn('⚠️  Item com problema de serialização removido:', error.message);
        return null;
      }
    }).filter(item => item !== null);

    // Retorna o último relatório se existe, ou dados padrão
    const response = sanitizedData.length > 0 ? sanitizedData[sanitizedData.length - 1] : null;

    if (response) {
      console.log(`✅ Retornando relatório: ${response.reportTitle || 'Sem título'}`);
      res.json(response);
    } else if (USE_DEFAULT_DATA) {
      console.log('📋 Retornando dados padrão (nenhum relatório recebido ainda)');
      res.json({
        ...defaultReportData,
        id: 0,
        receivedAt: new Date().toISOString(),
        retrievedAt: new Date().toISOString(),
        isDefaultData: true
      });
    } else {
      console.log('📭 Nenhum relatório encontrado');
      res.json([]);
    }
  } catch (error) {
    console.error('❌ Erro ao retornar relatórios:', error);
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
  console.log(`📊 USE_DEFAULT_DATA: ${USE_DEFAULT_DATA}`);
  console.log(`🔗 WEBHOOK_URL: ${WEBHOOK_URL || 'Não configurado'}`);

  if (isBolt) {
    console.log(`\n🌐 PRODUÇÃO: Endpoints públicos:`);
    console.log(`   POST https://${process.env.HOST || 'your-domain'}/api/relatorios`);
    console.log(`   GET  https://${process.env.HOST || 'your-domain'}/api/relatorios`);
    console.log(`   GET  https://${process.env.HOST || 'your-domain'}/api/status`);
    console.log(`   DELETE https://${process.env.HOST || 'your-domain'}/api/relatorios`);
  } else {
    console.log(`📡 Endpoints locais:`);
    console.log(`   POST http://localhost:${PORT}/api/relatorios`);
    console.log(`   GET  http://localhost:${PORT}/api/relatorios`);
    console.log(`   GET  http://localhost:${PORT}/api/status`);
    console.log(`   DELETE http://localhost:${PORT}/api/relatorios`);
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