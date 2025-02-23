# Используем официальный Python-образ
FROM python:3.10-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файл зависимостей
COPY requirements.txt .

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r requirements.txt

# Копируем исходный код приложения (например, api.py и другие файлы)
COPY . .

# Открываем порт, который будем использовать (например, 8000)
EXPOSE 8000

# Запускаем FastAPI через uvicorn
CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "8000"]
