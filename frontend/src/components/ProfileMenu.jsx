import React, { useState } from "react";
import "../styles/profilemenu.css";
import bellIcon from "../assets/bell.svg"; // Иконка колокольчика
import avatarIcon from "../assets/avatar.svg"; // Аватарка пользователя
import ProfileIcon from "../assets/profile.svg";
import SettingsIcon from "../assets/settings.svg";
import ExitIcon from "../assets/exit.svg";

const ProfileMenu = () => {
  const [hasNotifications, setHasNotifications] = useState(true); // Есть ли уведомления
  const [isOpen, setIsOpen] = useState(false); // Открыто ли меню

  return (
    <div className="profile-menu">
      {/* Иконка уведомлени */}
      <div className="notification-icon">
        <img src={bellIcon} alt="Notifications" />
        {hasNotifications && <span className="notification-dot"></span>}
      </div>

      {/* Блок профиля */}
      <div className="profile-info" onClick={() => setIsOpen(!isOpen)}>
        <img src={avatarIcon} alt="User Avatar" className="avatar" />
        <div className="user-details">
          <span className="user-name">Олег Олегович</span>
          <span className="user-role">Admin</span>
        </div>
        <span className="dropdown-arrow">▼</span>
      </div>

      {/* Выпадающее меню (можно позже доработать) */}
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
            <li>
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
