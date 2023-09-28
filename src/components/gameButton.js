import React from "react";
import styles from "./gameButton.module.css";

const GameButton = ({ value, onClick, isSelected, isWrong }) => {
    console.log(value, isWrong)
    const className = `${styles.gameButton} ${isWrong ? styles.wrong : isSelected ? styles.selected : ""}`;
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={isSelected}
    >
      {value}
    </button>
  );
};

export default GameButton;