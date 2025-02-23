import React from "react";
import "../styles/create-button.css";

const CreateButton = ({ onClick, text }) => {
  return (
    <button
      className={`create-button ${
        text === "+" ? "plus-button" : "create-text"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default CreateButton;
