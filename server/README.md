# Servidor de Relatórios CRM

Este servidor Node.js replica a funcionalidade do `api.py` original, fornecendo endpoints para receber e servir dados de relatórios CRM.

## Funcionalidades

### Endpoints Disponíveis

1. **POST /api/teste** - Recebe dados de relatório
   - Aceita JSON no body da requisição
   - Se receber array, pega o primeiro item
   - Armazena os dados em memória
   - Retorna confirmação de recebimento

2. **GET /api/relatorios** - Lista todos os relatórios armazenados
   - Retorna array JSON com todos os relatórios recebidos
   - Usado pelo frontend para exibir os dados

3. **GET /api/status** - Status do servidor
   - Informações sobre o servidor (uptime, memória, etc.)
   - Quantidade de relatórios armazenados

4. **DELETE /api/relatorios** - Limpa todos os relatórios
   - Remove todos os dados armazenados
   - Útil para reset durante desenvolvimento

## Como Usar

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Rodar servidor em modo desenvolvimento (com auto-reload)
npm run server:dev

# Ou rodar servidor normal
npm run server
```

### Produção
```bash
# Build do frontend
npm run build

# Rodar servidor (serve frontend + API)
npm run server
```

## Configuração

- **Porta**: Define via `PORT` environment variable ou usa 8000 por padrão
- **CORS**: Configurado para aceitar qualquer origem (ajustar para produção)
- **Limite JSON**: 50MB para payloads grandes

## Fluxo de Dados

1. **Recebimento**: Dados enviados via POST para `/api/teste`
2. **Armazenamento**: Dados ficam em memória (array `recebidos`)
3. **Consulta**: Frontend faz GET em `/api/relatorios` para obter dados
4. **Exibição**: Dashboard processa e exibe os relatórios

## Diferenças do Python Original

- **Tecnologia**: Node.js/Express em vez de FastAPI/Python
- **Ngrok**: Não incluído (pode ser adicionado separadamente se necessário)
- **Persistência**: Mesma abordagem (em memória)
- **Endpoints**: Idênticos ao original

## Exemplo de Uso

```bash
# Enviar dados
curl -X POST http://localhost:8000/api/teste \
  -H "Content-Type: application/json" \
  -d '{"reportTitle": "Teste", "data": "exemplo"}'

# Consultar dados
curl http://localhost:8000/api/relatorios

# Ver status
curl http://localhost:8000/api/status
```