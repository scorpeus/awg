import React, { useState, useEffect, useRef } from "react";
import "../styles/configuration.css";

const Configuration = () => {
  const [isOpen, setIsOpen] = useState(() => {
    return JSON.parse(localStorage.getItem("configOpen")) || false;
  });
  const headerRef = useRef(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const [configParams, setConfigParams] = useState({
    jc: 8,
    jmin: 50,
    jmax: 1000,
    s1: 95,
    s2: 26,
    h1: 906362082,
    h2: 1755628458,
    h3: 1775492462,
    h4: 433974065,
  });

  // 🔹 Состояние модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedParams, setEditedParams] = useState({ ...configParams });

  useEffect(() => {
    localStorage.setItem("configOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  useEffect(() => {
    if (headerRef.current && isOpen) {
      const containerHeight = headerRef.current.parentElement.offsetHeight;
      const headerHeight = headerRef.current.offsetHeight;
      setMaxHeight(`${containerHeight - headerHeight}px`);
    }
  }, [isOpen]);

  const toggleConfig = () => {
    setIsOpen((prev) => !prev);
  };

  // 🔹 Открыть модальное окно и скопировать параметры
  const openEditModal = () => {
    setEditedParams({ ...configParams });
    setIsModalOpen(true);
  };

  // 🔹 Обновление значений в инпутах
  const handleInputChange = (key, value) => {
    setEditedParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // 🔹 Сохранить изменения
  const saveChanges = () => {
    setConfigParams({ ...editedParams });
    setIsModalOpen(false);
  };

  return (
    <div className={`configuration-container ${isOpen ? "open" : "closed"}`}>
      <div className="config-header" ref={headerRef}>
        <span>Configuration</span>
        <button className="config-toggle" onClick={toggleConfig}>
          ▼
        </button>
      </div>

      <div
        className="config-content-wrapper"
        style={{ maxHeight: isOpen ? maxHeight : "0px" }}
      >
        <div className="config-content">
          {Object.entries(configParams).map(([key, value]) => (
            <p key={key}>
              {key} = {value}
            </p>
          ))}
        </div>

        <button className="edit-button" onClick={openEditModal}>
          Редактировать
        </button>
      </div>

      {/* 🔹 Модальное окно редактирования */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Редактирование параметров</h3>
            <div className="modal-inputs">
              {Object.entries(editedParams).map(([key, value]) => (
                <div className="modal-input-row" key={key}>
                  <span className="param-name">{key} =</span>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="modal-buttons">
              <button onClick={saveChanges}>Сохранить</button>
              <button onClick={() => setIsModalOpen(false)}>Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Configuration;
