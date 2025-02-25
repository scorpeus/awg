FROM amneziavpn/amnezia-wg:latest

# Устанавливаем дополнительные пакеты, если нужно
RUN apk add --no-cache dumb-init bash iptables

# Проверяем, есть ли конфиг, если нет — генерируем
COPY ./wg0.conf /etc/wireguard/wg0.conf

# Порты WireGuard из переменных окружения
ENV WG_PORT=50000
ENV WG_HOST=45.151.72.108
ENV PASSWORD_HASH=zMvzOPjUzdaH

# Проверка: интерфейс WireGuard должен быть активен
HEALTHCHECK --interval=1m --timeout=5s --retries=3 \
  CMD wg show | grep -q interface || exit 1

# Запуск WireGuard с конфигом wg0.conf
ENTRYPOINT ["wg-quick", "up", "wg0"]
