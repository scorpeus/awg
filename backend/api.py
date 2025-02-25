from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt


app = FastAPI(
    title="Amnezeus VPN API",
    version="0.1.0"
)

# Добавляем middleware для поддержки CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешаем все домены (для разработки)
    allow_credentials=True,
    allow_methods=["*"],  # Разрешаем все HTTP методы
    allow_headers=["*"],  # Разрешаем все заголовки
)

# Пример хранения пользователей (логин/пароль)
fake_users_db = {
    "admin": {
        "username": "admin",
        "password": "password"  # В реальном приложении нужно хешировать пароли
    }
}

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Модели данных
class UserLogin(BaseModel):
    username: str
    password: str

class VPNClient(BaseModel):
    name: str
    ip: str

# Временное хранилище клиентов
clients = {}

# Генерация токена JWT
def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=30)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Проверка токена
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.PyJWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid token",
        )

# Маршрут логина, возвращает токен
@app.post("/login")
def login(user: UserLogin):
    if user.username in fake_users_db and fake_users_db[user.username]["password"] == user.password:
        # Генерация токена при успешной авторизации
        access_token = create_access_token(data={"sub": user.username})
        return {"token": access_token}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Защищенный эндпоинт для получения списка клиентов
@app.get("/clients")
def list_clients(token: str = Depends(verify_token)):
    """
    Возвращает всех зарегистрированных клиентов. Проверяет валидность токена.
    """
    return clients

# Эндпоинт для создания клиента
@app.post("/clients")
def create_client(client: VPNClient, token: str = Depends(verify_token)):
    """
    Создает нового клиента. Только для авторизованных пользователей.
    """
    if client.name in clients:
        raise HTTPException(
            status_code=400,
            detail="Клиент с таким именем уже существует"
        )
    clients[client.name] = {"ip": client.ip}
    return {"message": "Клиент успешно создан", "client": client}

# Эндпоинт для удаления клиента
@app.delete("/clients/{client_name}")
def delete_client(client_name: str, token: str = Depends(verify_token)):
    """
    Удаляет клиента по имени. Только для авторизованных пользователей.
    """
    if client_name not in clients:
        raise HTTPException(
            status_code=404,
            detail="Клиент не найден"
        )
    del clients[client_name]
    return {"message": f"Клиент '{client_name}' удалён"}
