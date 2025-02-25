import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok && data.token) {
      localStorage.setItem("jwt", data.token); // Сохраняем токен
      localStorage.setItem("role", data.role); // Сохраняем роль (admin/moderator)
      localStorage.setItem("full_name", data.full_name); // Сохраняем имя пользователя
      setIsAuthenticated(true);
      navigate("/system"); // Перенаправляем на главную страницу
    } else {
      alert("Ошибка при авторизации!");
    }
  };

  return (
    <div>
      <h2>Авторизация</h2>
      <form className="form-box" onSubmit={handleLogin}>
        <div>
          <label htmlFor="username"></label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Логин"
            required
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            required
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
