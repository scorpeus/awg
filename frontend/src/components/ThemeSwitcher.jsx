import { useState, useEffect } from "react";
import "../styles/theme-switcher.css";
import LightIcon from "../assets/light.svg";
import DarkIcon from "../assets/dark.svg";

const ThemeSwitcher = () => {
  // Начальное состояние темы (из localStorage)
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  // При изменении темы обновляем <html> и localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={`theme-switcher ${theme}`} onClick={toggleTheme}>
      {/* Ползунок (движется при смене темы) */}
      <div className={`slider ${theme}`}></div>

      {/* Светлая тема */}
      <div className="option light">
        <img src={LightIcon} alt="lightIcon" className="theme-icon-light" />
        <span className="label">Light</span>
      </div>

      {/* Тёмная тема */}
      <div className="option dark">
        <img src={DarkIcon} alt="DarkIcon" className="theme-icon-dark" />
        <span className="label">Dark</span>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
