import React, { useEffect, useRef, useState } from "react";
import "../styles/peers.css";
import EditIcon from "../assets/edit.svg";
import QrCodeIcon from "../assets/qr.svg";
import DownloadIcon from "../assets/download.svg";
import DeleteIcon from "../assets/delete.svg";
import ToggleSwitch from "./ToggleSwitch";
import { QRCodeCanvas } from "qrcode.react";
import AvatarIcon from "../assets/avatar.svg";
import ArrowIcon from "../assets/arrow.svg";

const PeerCard = ({ peer, onDelete, onEdit }) => {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(peer.active);
  const nameRef = useRef(null);
  const textRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  // Проверка, длиннее ли текст, чем контейнер
  useEffect(() => {
    const checkOverflow = () => {
      if (nameRef.current && textRef.current) {
        const containerWidth = nameRef.current.offsetWidth;
        const textWidth = textRef.current.scrollWidth;
        setIsScrolling(textWidth > containerWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [peer.name]);

  // Переключение активности пира
  const togglePeer = () => setIsActive((prev) => !prev);

  // Открытие / Закрытие модального окна с QR-кодом
  const toggleQRModal = () => setIsQRModalOpen((prev) => !prev);

  // ✅ Скачивание конфигурационного файла
  const downloadConfig = () => {
    const configData = `[Peer]\nPublicKey = ${peer.publicKey}\nAllowedIPs = ${peer.ip}/32`;
    const blob = new Blob([configData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${peer.name}.conf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="peer-card">
      {/* 🔹 1. Блок Аватара и Статуса */}
      <div className="peer-avatar-block">
        <div className="peer-avatar-wrapper">
          <div className="peer-avatar">
            <img src={peer.avatar || AvatarIcon} alt="Avatar" />
          </div>
          <span className={`status-dot ${isActive ? "online" : "offline"}`} />
        </div>
      </div>

      {/* 🔹 2. Информационный блок */}
      <div className="peer-info-block">
        <div className="peer-name-box" ref={nameRef}>
          <div className="peer-name">
            <span ref={textRef} className={isScrolling ? "scrollable" : ""}>
              {peer.name}
            </span>
          </div>
          {/* 🔹 Теперь кнопка редактирования передаёт `peer` в `onEdit` */}
          <button className="edit-icon" onClick={() => onEdit(peer)}>
            <img src={EditIcon} alt="Edit" />
          </button>
        </div>
        <div className="peer-ip">IP: {peer.ip}</div>
        <div className="peer-last-seen">{peer.lastSeen}</div>
      </div>

      {/* 🔹 3. Менеджер-блок (Кнопки управления + Трафик) */}
      <div className="peer-manager-block">
        <div className="peer-actions">
          <ToggleSwitch isActive={isActive} onToggle={togglePeer} />
          <button className="peer-button" onClick={toggleQRModal}>
            <img src={QrCodeIcon} alt="QR Code" className="card-icon" />
          </button>
          <button className="peer-button" onClick={downloadConfig}>
            <img src={DownloadIcon} alt="Download" className="card-icon" />
          </button>
          <button
            className="peer-button delete"
            onClick={() => onDelete(peer.ip)}
          >
            <img src={DeleteIcon} alt="Delete" className="card-icon" />
          </button>
        </div>
        {/* 🔹 Блок с трафиком (Остался на месте) */}
        <div className="peer-traffic-block">
          <div className="traffic-item">
            <img src={ArrowIcon} alt="Arrow Down" className="arrow-icon-down" />
            <div className="traffic-info">
              <p className="traffic-value">45.26 Gb</p>
              <p className="traffic-speed">0 B/s</p>
            </div>
          </div>
          <div className="traffic-item">
            <img src={ArrowIcon} alt="Arrow Down" className="arrow-icon-up" />
            <div className="traffic-info">
              <p className="traffic-value">19.26 Gb</p>
              <p className="traffic-speed">0 B/s</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Модальное окно с QR-кодом */}
      {isQRModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>QR-код конфигурации</h3>
            <QRCodeCanvas value={`wireguard://${peer.ip}`} size={200} />
            <div className="modal-buttons">
              <button onClick={toggleQRModal}>Закрыть</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PeerCard;
