import React, { useState, useEffect, useRef } from "react";
import "../styles/profilemenu.css";
import bellIcon from "../assets/bell.svg";
import avatarIcon from "../assets/avatar.svg";
import ProfileIcon from "../assets/profile.svg";
import SettingsIcon from "../assets/settings.svg";
import ExitIcon from "../assets/exit.svg";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ setIsAuthenticated }) => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [rotate, setRotate] = useState(0);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Загружаем имя и роль из localStorage
  const fullName = localStorage.getItem("full_name") || "Загрузка...";
  const role = localStorage.getItem("role") || "";

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("full_name");
    setIsAuthenticated(false);
    setIsOpen(false);
    setRotate(0);
    navigate("/login");
  };

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
    setRotate((prev) => (prev === 0 ? 180 : 0));
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <div className="notification-icon">
        <img src={bellIcon} alt="Notifications" />
        {hasNotifications && <span className="notification-dot"></span>}
      </div>

      <div className="profile-info" onClick={handleMenuToggle}>
        <img src={avatarIcon} alt="User Avatar" className="avatar" />
        <div className="user-details">
          <span className="user-name">{fullName}</span>
          <span className="user-role">{role}</span>
        </div>
        <span
          className="dropdown-arrow"
          style={{ transform: `rotate(${rotate}deg)`, transition: "0.3s" }}
        >
          ▼
        </span>
      </div>

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
