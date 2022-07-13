import React, { useState } from "react";
import odlaw from "../assets/images/odlaw.png";
import wally from "../assets/images/wally.png";
import whitebeard from "../assets/images/whitebeard.png";
import "../assets/styles/DropdownMenu.css";

export default function DropdownMenu(props) {
  const [character, setCharacter] = useState("wally");

  function checkPosition(data, positionX, positionY, char) {
    console.log(character);
    console.log(
      "Real Y" + positionY + "Max Y" + data.maxY + "Min Y" + data.minY
    );
    if (
      positionY < data.minY ||
      positionY > data.maxY ||
      positionX > data.maxX ||
      positionX < data.minY
    ) {
      console.log("mal");
      props.showMistake();
    } else {
      props.setFoundCharacters((prevState) => {
        const data = { ...prevState, [char]: true };
        return data;
      });
      console.log("bien");
    }
  }

  function characterSelection(char) {
    setCharacter(char);
    let data = props.characterPositions[char];
    console.log(data);
    checkPosition(data, props.position.x, props.position.y, char);
  }

  const style = {
    left: props.position.x,
    top: props.position.y + 100,
  };

  function optionOnClick(char) {
    characterSelection(char);
    props.setToggleDisplay(false);
  }

  return (
    <div style={style} className="dropdown-menu">
      <div className="target">+</div>
      <ul className="options">
        <h2>Select:</h2>
        <li
          onClick={() => {
            optionOnClick("wally");
          }}
          className="menu-options"
        >
          <img
            className="menu-characters-img"
            alt="wally-icon"
            src={wally}
          ></img>
          <p className="menu-character-name">Wally</p>
        </li>
        <li
          onClick={() => {
            optionOnClick("whitebeard");
          }}
          className="menu-options"
        >
          <img
            className="menu-characters-img"
            alt="whitebeard-icon"
            src={whitebeard}
          ></img>
          <p className="menu-character-name">Whizard Whitebeard</p>
        </li>
        <li
          onClick={() => {
            optionOnClick("odlaw");
          }}
          className="menu-options"
        >
          <img
            className="menu-characters-img"
            alt="odlaw-icon"
            src={odlaw}
          ></img>
          <p className="menu-character-name">Odlaw</p>
        </li>
      </ul>
      <div></div>
    </div>
  );
}
