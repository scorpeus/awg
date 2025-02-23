import React, { useEffect, useRef, useState } from "react";
import "../styles/interface-status.css";
import EditIcon from "../assets/edit.svg";

const InterfaceStatus = ({
  name,
  creationDate,
  creationTime,
  isActive,
  onEdit,
}) => {
  const nameRef = useRef(null); // Контейнер названия
  const textRef = useRef(null); // Сам текст
  const [isScrolling, setIsScrolling] = useState(false); // Флаг для анимации

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
  }, [name]);

  return (
    <div className="interface-status">
      <div className="interface-header">
        <span
          className={`status-indicator ${isActive ? "active" : "inactive"}`}
        ></span>

        {/* Название теперь двигается только если оно длинное */}
        <div className="interface-name" ref={nameRef}>
          <span
            ref={textRef}
            title={name}
            className={isScrolling ? "scrollable" : ""}
          >
            {name}
          </span>
        </div>

        <button className="edit-icon" onClick={onEdit}>
          <img src={EditIcon} alt="edit-icon" className="edition" />
        </button>
      </div>

      <div className="interface-timestamp">
        <p>{creationDate}</p>
        <p>{creationTime}</p>
      </div>
    </div>
  );
};

export default InterfaceStatus;
