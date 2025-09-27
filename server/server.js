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
// Em produção, USE_DEFAULT_DATA é true por padrão, exceto se explicitamente definido como 'false'
const USE_DEFAULT_DATA = isBolt ? (process.env.USE_DEFAULT_DATA !== 'false') : (process.env.USE_DEFAULT_DATA === 'true');

// Trust proxy for correct client IP and HTTPS handling
app.set('trust proxy', 1);

// Lista em memória para armazenar todos os relatórios recebidos
let recebidos = [];

// CORS configurável via environment
const allowedOrigins = process.env.CORS_ALLOW_ORIGINS || '*';
const corsOrigins = allowedOrigins === '*' ? true : allowedOrigins.split(',').map(origin => origin.trim());

app.use(cors({
  origin: corsOrigins,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

// Middleware para parsing JSON
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const startTime = Date.now();

  console.log(`📋 ${req.method} ${req.path} - ${req.ip || req.connection.remoteAddress} - ID: ${requestId}`);

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const statusIcon = res.statusCode < 400 ? '✅' : res.statusCode < 500 ? '⚠️' : '❌';

    console.log(`${statusIcon} ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms - ID: ${requestId}`);
  });

  next();
});

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

// Endpoint raiz com informações da API
app.get('/', (req, res) => {
  res.json({
    service: 'Dashboard Lagos API',
    version: '1.0.0',
    status: 'operational',
    timestamp: new Date().toISOString(),
    environment: isBolt ? 'production' : 'development',
    features: {
      default_data: USE_DEFAULT_DATA,
      webhook: !!WEBHOOK_URL
    },
    endpoints: {
      reports_get: 'GET /api/relatorios',
      reports_post: 'POST /api/relatorios',
      health: 'GET /api/status',
      clear_reports: 'DELETE /api/relatorios'
    },
    documentation: {
      get_reports: {
        method: 'GET',
        path: '/api/relatorios',
        description: 'Retorna o último relatório armazenado ou dados padrão'
      },
      post_report: {
        method: 'POST',
        path: '/api/relatorios',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          reportTitle: 'string (required)',
          executiveSummary: 'object (required)',
          performanceAnalysis: 'object (optional)',
          competitiveAnalysis: 'object (optional)',
          clientAnalysis: 'object (optional)',
          productAnalysis: 'object (optional)',
          strategicInsights: 'object (optional)'
        }
      }
    }
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
      res.status(404).json({
        error: 'Frontend não encontrado',
        message: 'Execute npm run build primeiro.',
        service: 'Dashboard Lagos API',
        timestamp: new Date().toISOString()
      });
    }
  });
}

// Tratamento de erros global
app.use((error, req, res, next) => {
  const errorId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  console.error(`💥 Erro interno - ${req.method} ${req.path} - ${req.ip} - ID: ${errorId}`, {
    error: error.message,
    stack: error.stack
  });

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    status: "error",
    message: process.env.NODE_ENV === 'development' ? error.message : 'Erro interno do servidor',
    errorId,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown function
const gracefulShutdown = (signal) => {
  console.log(`📴 Shutdown gracioso iniciado - Signal: ${signal} - Uptime: ${process.uptime().toFixed(2)}s`);

  server.close((err) => {
    if (err) {
      console.error(`❌ Erro ao fechar servidor: ${err.message}`);
      process.exit(1);
    }

    console.log(`✅ Servidor fechado com sucesso - Uptime: ${process.uptime().toFixed(2)}s`);

    setTimeout(() => {
      console.warn('⚠️ Forçando shutdown por timeout (30s)');
      process.exit(1);
    }, 30000);

    process.exit(0);
  });
};

// Função para inicializar o servidor
async function bootstrap() {
  console.log(`🚀 Dashboard Lagos API iniciada - Port:${PORT} Env:${process.env.NODE_ENV} PID:${process.pid}`);
  console.log(`📊 USE_DEFAULT_DATA: ${USE_DEFAULT_DATA}`);
  console.log(`🔗 WEBHOOK_URL: ${WEBHOOK_URL || 'Não configurado'}`);

  if (isBolt) {
    const domain = process.env.HOST || 'lagos.automear.com';
    console.log(`\n🌐 PRODUÇÃO: Endpoints públicos:`);
    console.log(`   GET  https://${domain}/`);
    console.log(`   POST https://${domain}/api/relatorios`);
    console.log(`   GET  https://${domain}/api/relatorios`);
    console.log(`   GET  https://${domain}/api/status`);
    console.log(`   DELETE https://${domain}/api/relatorios`);
    console.log(`\n🎯 Dashboard: https://${domain}/`);
  } else {
    console.log(`📡 Endpoints locais:`);
    console.log(`   GET  http://localhost:${PORT}/`);
    console.log(`   POST http://localhost:${PORT}/api/relatorios`);
    console.log(`   GET  http://localhost:${PORT}/api/relatorios`);
    console.log(`   GET  http://localhost:${PORT}/api/status`);
    console.log(`   DELETE http://localhost:${PORT}/api/relatorios`);
    console.log(`\n🎯 DESENVOLVIMENTO: Frontend rodando no Vite (porta 5173)`);
    console.log(`   Dashboard: http://localhost:5173`);
  }
}

// Iniciar o servidor
const server = app.listen(PORT, () => {
  bootstrap();
});

// Process event handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error) => {
  console.error(`💥 Exceção não tratada - PID:${process.pid} - ${error.message}`);
  console.debug('Stack trace:', { stack: error.stack });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  const errorMsg = reason instanceof Error ? reason.message : String(reason);
  console.error(`💥 Promise rejeitada - PID:${process.pid} - ${errorMsg}`);
  console.debug('Promise details:', {
    stack: reason instanceof Error ? reason.stack : 'N/A',
    promise: promise.toString()
  });
  process.exit(1);
});