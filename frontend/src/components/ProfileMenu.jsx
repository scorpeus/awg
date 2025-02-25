import React, { useState, useEffect, useRef } from "react";
import "../styles/profilemenu.css";
import bellIcon from "../assets/bell.svg"; // Иконка колокольчика
import avatarIcon from "../assets/avatar.svg"; // Аватарка пользователя
import ProfileIcon from "../assets/profile.svg";
import SettingsIcon from "../assets/settings.svg";
import ExitIcon from "../assets/exit.svg";
import { useNavigate } from "react-router-dom"; // Хук для навигации

const ProfileMenu = ({ setIsAuthenticated }) => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // Меню теперь не берется из localStorage
  const [rotate, setRotate] = useState(0); // Стрелка вниз по умолчанию
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Закрытие меню при клике вне него
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setRotate(0); // Стрелка вниз при закрытии
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Гарантированно закрываем меню при изменении аутентификации
  useEffect(() => {
    setIsOpen(false);
    setRotate(0);
  }, [setIsAuthenticated]);

  // Функция выхода
  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Удаляем токен
    localStorage.removeItem("profileMenuOpen"); // Очищаем состояние меню
    setIsAuthenticated(false);
    setIsOpen(false); // Закрываем меню
    setRotate(0); // Стрелка вниз
    navigate("/login"); // Перенаправление на авторизацию
  };

  // Переключение меню
  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
    setRotate((prev) => (prev === 0 ? 180 : 0)); // Поворот стрелки
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      {/* Иконка уведомлений */}
      <div className="notification-icon">
        <img src={bellIcon} alt="Notifications" />
        {hasNotifications && <span className="notification-dot"></span>}
      </div>

      {/* Блок профиля */}
      <div className="profile-info" onClick={handleMenuToggle}>
        <img src={avatarIcon} alt="User Avatar" className="avatar" />
        <div className="user-details">
          <span className="user-name">Олег Олегович</span>
          <span className="user-role">Admin</span>
        </div>
        <span
          className="dropdown-arrow"
          style={{ transform: `rotate(${rotate}deg)`, transition: "0.3s" }}
        >
          ▼
        </span>
      </div>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <img src={ProfileIcon} alt="Profile" className="menu-icon" />
              Profile
            </li>
            <li>
              <img src={SettingsIcon} alt="Settings" className="menu-icon" />
              Settings
            </li>
            <li onClick={handleLogout}>
              <img src={ExitIcon} alt="Exit" className="menu-icon" />
              Exit
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
