import React, { useState, useEffect } from "react";
import PeerCard from "./PeerCard";
import "../styles/peers.css";
import "../styles/interfaces.css";

const PeersList = ({ hasActiveInterface }) => {
  const [peers, setPeers] = useState([
    {
      name: "Peer 1",
      ip: "10.8.0.2",
      lastSeen: "Только что",
      active: false,
      uploaded: 0,
      downloaded: 0,
      uploadSpeed: 0,
      downloadSpeed: 0,
    },
    {
      name: "Peer 2",
      ip: "10.8.0.3",
      lastSeen: "Только что",
      active: false,
      uploaded: 0,
      downloaded: 0,
      uploadSpeed: 0,
      downloadSpeed: 0,
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingPeer, setEditingPeer] = useState(null);
  const [newPeerName, setNewPeerName] = useState("");
  const [newPeerIP, setNewPeerIP] = useState("");

  useEffect(() => {
    // Здесь можно будет делать запрос к API, если нужно
  }, []);

  // Функция поиска свободного IP-адреса (берем первый свободный от 2 до 250
  const getAvailableIP = () => {
    const usedIPs = new Set(peers.map((peer) => Number(peer.ip.split(".")[3])));
    for (let i = 2; i <= 250; i++) {
      if (!usedIPs.has(i)) {
        return `10.8.0.${i}`;
      }
    }
    return "10.8.0.2";
  };

  // Открытие модального окна для создания нового пира
  const openCreateModal = () => {
    setEditingPeer(null);
    setNewPeerName("");
    setNewPeerIP(getAvailableIP());
    setShowModal(true);
  };

  // Открытие модалки редактирования
  const openEditModal = (peer) => {
    setEditingPeer(peer);
    setNewPeerName(peer.name);
    setNewPeerIP(peer.ip);
    setShowModal(true);
  };

  // Закрытие модального окна
  const closeModal = () => setShowModal(false);

  // Создание / Редактирование пира
  const savePeer = () => {
    if (!newPeerName.trim() || !newPeerIP.trim()) return;

    setPeers((prevPeers) =>
      editingPeer
        ? prevPeers.map((peer) =>
            peer.ip === editingPeer.ip
              ? { ...peer, name: newPeerName.trim(), ip: newPeerIP.trim() }
              : peer
          )
        : [
            ...prevPeers,
            {
              name: newPeerName.trim(),
              ip: newPeerIP.trim(),
              lastSeen: "Только что",
              active: false,
              uploaded: 0,
              downloaded: 0,
              uploadSpeed: 0,
              downloadSpeed: 0,
            },
          ]
    );

    closeModal();
  };

  return (
    <>
      {/* Закрепленный заголовок */}
      <div className="peers-header">
        <h2 className="peers-title">Peers</h2>
        <div className="peers-actions">
          <div className="peers-filter">Фильтр</div>
          {hasActiveInterface && (
            <button className="plus-button" onClick={openCreateModal}>
              +
            </button>
          )}
        </div>
      </div>

      {/* Основной контейнер списка пиров */}
      <div className="peers-container">
        <div className="peers-grid">
          {peers.length === 0 ? (
            <p className="no-peers">Нет активных подключений</p>
          ) : (
            peers.map((peer, index) => (
              <PeerCard
                key={index}
                peer={peer}
                onEdit={openEditModal}
                onDelete={(ip) =>
                  setPeers((prev) => prev.filter((p) => p.ip !== ip))
                }
              />
            ))
          )}
        </div>

        {/* Модальное окно */}
        {showModal && (
          <div className="modal">
            <form
              className="modal-content"
              onSubmit={(e) => {
                e.preventDefault();
                savePeer();
              }}
            >
              <h3>
                {editingPeer ? "Редактировать пира" : "Создать нового пира"}
              </h3>
              <div className="modal-input-block">
                <div className="modal-input-row">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={newPeerName}
                    onChange={(e) => setNewPeerName(e.target.value)}
                    placeholder="Введите имя"
                  />
                </div>
                <div className="modal-input-row">
                  <label>IP:</label>
                  <input
                    type="text"
                    value={newPeerIP}
                    onChange={(e) => setNewPeerIP(e.target.value)}
                    // Теперь поле IP всегда редактируемое
                  />
                </div>
              </div>
              <div className="modal-buttons">
                <button type="submit">Сохранить</button>
                <button type="button" onClick={closeModal}>
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default PeersList;
