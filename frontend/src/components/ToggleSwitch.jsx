import React from "react";
import "../styles/toggle-switch.css";

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isActive} onChange={onToggle} />
      <span className="mini-slider"></span>
    </label>
  );
};
export default ToggleSwitch;
