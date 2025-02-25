import bcrypt

# Функция для хеширования пароля
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

# Генерируем хэши для admin и moderator
admin_password = hash_password("PkDuTeSb")  # Задай свой пароль
moderator_password = hash_password("INCHhJGo")  # Задай свой пароль

print("Admin hash:", admin_password)
print("Moderator hash:", moderator_password)
