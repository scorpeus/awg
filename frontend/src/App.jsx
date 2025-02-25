import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Interfaces from "./pages/Interfaces";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Login from "./pages/Login"; // Страница логина
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";
import "./styles/layout.css";

function AppContent() {
  const [title, setTitle] = useState("System");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation(); // Проверяем текущий путь

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 🔹 Если пользователь не авторизован, принудительно отправляем его на /login
  if (!isAuthenticated && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      {!isAuthenticated ? (
        <div className="login-container">
          <Login setIsAuthenticated={setIsAuthenticated} />
        </div>
      ) : (
        <div className="app-container">
          <Header title={title} setIsAuthenticated={setIsAuthenticated} />
          <div className="body-container">
            <aside className="sidebar">
              <Navbar setActiveTitle={setTitle} />
            </aside>
            <main className="mainbar">
              <Routes>
                <Route path="/system" element={<Dashboard />} />
                <Route path="/interfaces" element={<Interfaces />} />
                <Route path="/users" element={<Users />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                {/* 🔹 Перенаправляем любой несуществующий маршрут на /system */}
                <Route path="*" element={<Navigate to="/system" replace />} />
              </Routes>
            </main>
            <aside className="infobar">
              <div className="infobar-container"></div>
            </aside>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
