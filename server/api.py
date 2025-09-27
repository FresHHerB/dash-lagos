from typing import List, Dict, Any

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pyngrok import ngrok
import uvicorn
import asyncio

app = FastAPI()

# === Configuração do CORS ===
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # Em produção, restrinja aos domínios do seu front-end
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Lista em memória para armazenar todos os relatórios recebidos
recebidos: List[Dict[str, Any]] = []


@app.post("/api/teste")
async def processar_dados(request: Request):
    """
    Ingestão de JSON via POST.
    - Se receber uma lista, pega o primeiro item.
    - Armazena o payload em `recebidos`.
    """
    try:
        data = await request.json()
        if isinstance(data, list) and data:
            data = data[0]

        recebidos.append(data)
        print("Dados recebidos:", data)

        return {
            "status": "success",
            "message": "Dados recebidos e armazenados!",
            "dados_recebidos": data,
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/api/relatorios")
async def listar_relatorios():
    """
    Retorna a lista de relatórios já recebidos (array JSON puro).
    """
    return recebidos  # <-- retorna direto o List[dict]


async def main():
    port = 8000

    # Expondo via Ngrok
    public_url = ngrok.connect(port).public_url
    print(f"URL pública do Ngrok: {public_url}")
    print(f"POST {public_url}/api/teste")
    print(f"GET  {public_url}/api/relatorios")

    config = uvicorn.Config(app, host="127.0.0.1", port=port, log_level="info")
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
