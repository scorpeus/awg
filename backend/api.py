from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
import psycopg2
import bcrypt

app = FastAPI(title="Amnezeus VPN API", version="0.1.0")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключение к базе данных PostgreSQL
conn = psycopg2.connect(
    dbname="awgdb",
    user="postgres",
    password="DyMqWdCM",  # Замени на свой пароль
    host="localhost",
    client_encoding="UTF8"
)
cursor = conn.cursor()

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Модель данных для логина
class UserLogin(BaseModel):
    username: str
    password: str

# Функция проверки пароля
def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode(), hashed_password.encode())

# Функция генерации JWT-токена
def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Эндпоинт для логина
@app.post("/login")
def login(user: UserLogin):
    cursor.execute("SELECT password, role, full_name FROM admins WHERE username = %s", (user.username,))
    result = cursor.fetchone()

    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    stored_password, role, full_name = result
    print(f"full_name from DB: {full_name}")

    if not verify_password(user.password, stored_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Генерируем JWT-токен
    access_token = create_access_token({"sub": user.username, "role": role})

    print(f"Raw full_name: {full_name.encode('raw_unicode_escape').decode('utf-8')}")

    return {"token": access_token, "role": role, "full_name": full_name}  # Теперь отдаем full_name

