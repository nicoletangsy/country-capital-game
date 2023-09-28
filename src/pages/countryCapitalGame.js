import React, { useState } from "react";
import GameButton from "../components/gameButton";

const CountryCapitalGame = ({ data }) => {
  function getRandomButtons() {
    let count = 0;
    let pairCount = 0;
    const buttons = [];
    for (const country in data) {
      buttons.push({
        name: country,
        id: count++,
        pairId: pairCount,
      });
      buttons.push({
        name: data[country],
        id: count++,
        pairId: pairCount++,
      });
    }
    return buttons.sort(() => Math.random() - 0.5);
  }
  const [buttons, setButtons] = useState(getRandomButtons());
  const [selectedPair, setSelectedPair] = useState([]);
  const [showRestart, setShowRestart] = useState(false);

  function handleButtonClick(button) {
    if (selectedPair.length >= 2) {
      return; //prevent clicking more than 2 buttons
    }
    if (selectedPair.length === 0) {
      // first button clicked
      setSelectedPair([
        {
          id: button.id,
          pairId: button.pairId,
          isWrong: false,
        },
      ]);
    } else {
      // second button clicked
      if (selectedPair[0].pairId === button.pairId) {
        // matched
        removeButtons(selectedPair[0].id, button.id);
      } else {
        //not matched
        setSelectedPair((prev) => {
          return [
            {
              id: prev[0].id,
              pairId: prev[0].pairId,
              isWrong: true,
            },
            {
              id: button.id,
              pairId: button.pairId,
              isWrong: true,
            },
          ];
        });

        setTimeout(() => {
          setSelectedPair([]);
        }, 1000);
      }
    }
  }

  function removeButtons(countryID, capitalID) {
    const updatedButtons = buttons.filter(
      (button) => button.id !== countryID && button.id !== capitalID
    );

    setButtons(updatedButtons);
    setSelectedPair([]);

    if (updatedButtons.length === 0) {
      alert("Congratulations!");
      setShowRestart(true);
    }
  }

  return (
    <div>
      {buttons &&
        buttons.map((button, index) => {
          console.log(index, button);
          const isSelected =
            selectedPair.find((item) => item.id === button.id) !== undefined;
          const isWrong =
            selectedPair.find((item) => item.id === button.id)?.isWrong ||
            false;
          return (
            <GameButton
              key={index}
              value={button.name}
              onClick={() => handleButtonClick(button)}
              isSelected={isSelected}
              isWrong={isWrong}
            />
          );
        })}
      {showRestart && (
        <button
          onClick={() => {
            setButtons(getRandomButtons());
            setShowRestart(false);
          }}
        >
          Restart
        </button>
      )}
    </div>
  );
};

export default CountryCapitalGame;
