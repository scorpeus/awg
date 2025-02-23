import React, { useState, useRef } from "react";
import "../styles/interfaces.css";
import InterfaceStatus from "../components/InterfaceStatus.jsx";
import ConfigurationBlock from "../components/ConfigurationBlock.jsx";
import PeersList from "../components/PeersList.jsx";
import CreateButton from "../components/CreateButton.jsx";
import "../styles/peers.css";

const Interfaces = () => {
  const [interfaces, setInterfaces] = useState(["wg0", "wg1"]);
  const [activeTab, setActiveTab] = useState("wg0");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState("");

  const tabsRef = useRef(null);
  const handleWheelScroll = (e) => {
    if (tabsRef.current) {
      e.preventDefault();
      tabsRef.current.scrollLeft += e.deltaY;
    }
  };

  const openCreateModal = () => {
    setModalType("create");
    setModalData("");
    setShowModal(true);
  };

  const openEditModal = (interfaceName) => {
    setModalType("edit");
    setModalData(interfaceName);
    setShowModal(true);
  };

  const openDeleteModal = (interfaceName) => {
    setModalType("delete");
    setModalData(interfaceName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType(null);
    setModalData("");
  };

  const handleConfirm = () => {
    if (modalType === "create") {
      const newInterface = modalData.trim() || `wg${interfaces.length}`;
      if (!interfaces.includes(newInterface)) {
        setInterfaces([...interfaces, newInterface]);
        setActiveTab(newInterface);
      }
    } else if (modalType === "edit") {
      setInterfaces((prev) =>
        prev.map((iface) => (iface === activeTab ? modalData : iface))
      );
      setActiveTab(modalData);
    } else if (modalType === "delete") {
      const updatedInterfaces = interfaces.filter(
        (iface) => iface !== modalData
      );
      setInterfaces(updatedInterfaces);
      setActiveTab(updatedInterfaces.length > 0 ? updatedInterfaces[0] : "");
    }
    closeModal();
  };

  return (
    <div className="interfaces-container">
      <div className="tabs-container">
        {/* Если есть интерфейсы, показываем .tabs */}
        {interfaces.length > 0 ? (
          <div
            className="tabs-wrapper"
            ref={tabsRef}
            onWheel={handleWheelScroll}
          >
            <div className="tabs">
              {interfaces.map((iface) => (
                <div key={iface} className="tab-container">
                  <button
                    className={`tab ${activeTab === iface ? "active" : ""}`}
                    onClick={() => setActiveTab(iface)}
                  >
                    {iface}
                  </button>
                  <span
                    className="delete-icon"
                    onClick={() => openDeleteModal(iface)}
                  >
                    ❌
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Если интерфейсов нет, показываем сообщение, НО ВНЕ .tabs
          <p className="no-interfaces">Нет доступных интерфейсов</p>
        )}

        <CreateButton
          onClick={openCreateModal}
          text={interfaces.length === 0 ? "Создать" : "+"}
        />
      </div>

      {interfaces.length > 0 && (
        <div className="interface-card">
          <div className="interface-info">
            <div className="interface-settings">
              <p>ListenPort = 51888</p>
              <p>Address = 10.8.0.x/24</p>
              <p>Peers: x/250</p>
            </div>

            <InterfaceStatus
              name={activeTab}
              creationDate="10.02.2025"
              creationTime="15:16:05"
              isActive={true}
              onEdit={() => openEditModal(activeTab)}
            />
          </div>

          <ConfigurationBlock />
        </div>
      )}

      <PeersList hasActiveInterface={interfaces.length > 0} />

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>
              {modalType === "create" && "Введите название интерфейса"}
              {modalType === "edit" && "Редактировать имя"}
              {modalType === "delete" &&
                `Вы точно хотите удалить ${modalData}?`}
            </h3>

            {(modalType === "create" || modalType === "edit") && (
              <input
                className="modal-input-block"
                type="text"
                placeholder={
                  modalType === "create" ? `wg${interfaces.length}` : modalData
                }
                value={modalData}
                onChange={(e) => setModalData(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleConfirm();
                  }
                }}
              />
            )}

            <div className="modal-buttons">
              <button onClick={handleConfirm}>
                {modalType === "delete" ? "Удалить" : "Сохранить"}
              </button>
              <button onClick={closeModal}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Interfaces;
