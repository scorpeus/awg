import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Interfaces from "./pages/Interfaces";
import Users from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ThemeSwitcher from "./components/ThemeSwitcher";
import "./App.css";
import "./styles/layout.css"; // Подключаем глобальные стили

function AppContent() {
  const [title, setTitle] = useState("System");
  const location = useLocation(); // Теперь вызываем `useLocation` внутри Router

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("System");
        break;
      case "/interfaces":
        setTitle("Interfaces");
        break;
      case "/users":
        setTitle("Users");
        break;
      case "/subscriptions":
        setTitle("Subscriptions");
        break;
      default:
        setTitle("System Dashboard");
    }
  }, [location.pathname]); // Пересчитываем заголовок при изменении пути

  return (
    <div className="app-container">
      <Header title={title} />
      <div className="body-container">
        {/* Левый сайдбар */}
        <aside className="sidebar">
          <Navbar setActiveTitle={setTitle} />
          {/* <ThemeSwitcher /> */}
        </aside>

        {/* Основное содержимое */}
        <main className="mainbar">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/interfaces" element={<Interfaces />} />
            <Route path="/users" element={<Users />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
          </Routes>
        </main>

        {/* Правая панель */}
        <aside className="infobar">
          <div className="infobar-container"></div>
        </aside>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent /> {/* Обернули AppContent в Router */}
    </Router>
  );
}

export default App;
