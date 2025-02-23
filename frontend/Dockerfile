# Используем официальный Node.js образ
FROM node:18-alpine as builder

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальной исходный код
COPY . .

# Собираем приложение для production
RUN npm run build

# Второй этап – запускаем простой веб-сервер (например, nginx)
FROM nginx:alpine

# Копируем собранное приложение в папку, которую Nginx использует для отдачи статических файлов
COPY --from=builder /app/dist /usr/share/nginx/html

# Экспонируем порт 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
