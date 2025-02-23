# backend/api.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(
    title="Amnezeus VPN API",
    version="0.1.0"
)

# Пример модели данных (для демонстрации)
class VPNClient(BaseModel):
    name: str
    ip: str

# Временное хранилище (демонстрационное)
clients = {}

@app.get("/")
def read_root():
    """
    Простой эндпоинт для проверки, что сервер работает.
    """
    return {"message": "Hello from amnezeus-vpn API!"}

@app.get("/clients")
def list_clients():
    """
    Возвращает всех зарегистрированных клиентов.
    """
    return clients

@app.post("/clients")
def create_client(client: VPNClient):
    """
    Создаёт нового клиента.
    В реальном проекте здесь будет логика интеграции с AmneziaWG.
    """
    if client.name in clients:
        raise HTTPException(
            status_code=400,
            detail="Клиент с таким именем уже существует"
        )
    # Пока просто сохраняем в словарь (демо)
    clients[client.name] = {"ip": client.ip}
    return {"message": "Клиент успешно создан", "client": client}

@app.delete("/clients/{client_name}")
def delete_client(client_name: str):
    """
    Удаляет клиента по имени.
    """
    if client_name not in clients:
        raise HTTPException(
            status_code=404,
            detail="Клиент не найден"
        )
    del clients[client_name]
    return {"message": f"Клиент '{client_name}' удалён"}
