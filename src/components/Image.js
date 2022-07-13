import React from "react";
import GetUsername from "./GetUsername";
import img from "../assets/images/beach-wally.jpg";
import "../assets/styles/Image.css";
import DropdownMenu from "./DropdownMenu.js";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import popupImg from "../assets/images/background-wally.png";
import odlaw from "../assets/images/odlaw.png";
import wally from "../assets/images/wally.png";
import whitebeard from "../assets/images/whitebeard.png";

export default function Image(props) {
  const [mousePosition, setMousePosition] = useState({});
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [foundCharacters, setFoundCharacters] = useState({
    wally: false,
    whitebeard: false,
    odlaw: false,
  });
  const [characterPositions, setCharacterPositions] = useState({});
  const [mistakeDisplay, setMistakeDisplay] = useState(false);

  useEffect(() => {
    const data = {};
    const getCharacterPositions = async () => {
      const querySnapshot = await getDocs(
        collection(db, "position-characters")
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data[doc.id] = doc.data();
      });
    };
    setCharacterPositions(data);

    getCharacterPositions();
  }, []);

  useEffect(() => {
    function areAllTrue() {
      const areTruthy = Object.values(foundCharacters).every((value) => value);
      if (areTruthy) {
        setFoundCharacters({
          wally: false,
          odlaw: false,
          whitebeard: false,
        });
        props.setWonGame(true);
      }
    }
    areAllTrue();
  }, [foundCharacters]);

  function getMousePosition(e) {
    setMousePosition({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
    setToggleDisplay((prevState) => !prevState);
  }

  function showMistake() {
    setMistakeDisplay(true);
    setTimeout(setMistakeToFalse, 2000);
  }

  function setMistakeToFalse() {
    setMistakeDisplay(false);
  }

  return (
    <div>
      {mistakeDisplay && <div className="mistake-container">Try again...</div>}
      {!props.startGame && (
        <div className="start-game-container">
          <div className="start-game-popup">
            <div className="start-game-popup-text">
              <h2>Let's find Wally and his friends!</h2>
              <p>Tag Wally, Wizard Whitebeard and Odlaw as fast as you can!</p>
              <p>Scroll through the image to find the correct character.</p>
              <p>Click the character and choose the correct name.</p>
              <p>
                You will be timed and your score will be recorded, so move fast!
              </p>
              <button
                className="start-game-popup-button"
                onClick={() => props.setStartGame(true)}
              >
                Start Game
              </button>
            </div>
            <img className="start-game-popup-img" src={popupImg} alt=""></img>
          </div>
        </div>
      )}
      {props.wonGame && (
        <GetUsername
          setDisplayLeaderboard={props.setDisplayLeaderboard}
          counter={props.counter}
        />
      )}

      <img
        className="wally-image"
        onClick={getMousePosition}
        src={img}
        alt="wally-in-the-beach"
      ></img>
      {foundCharacters.wally && (
        <div className="found-character-wally">
          <img alt="wally-found-icon" src={wally}></img>
        </div>
      )}
      {foundCharacters.odlaw && (
        <div className="found-character-odlaw">
          <img alt="odlaw-found-icon" src={odlaw}></img>
        </div>
      )}
      {foundCharacters.whitebeard && (
        <div className="found-character-wizard">
          <img alt="whitebeard-found-icon" src={whitebeard}></img>
        </div>
      )}

      {toggleDisplay && (
        <DropdownMenu
          showMistake={showMistake}
          setToggleDisplay={setToggleDisplay}
          characterPositions={characterPositions}
          setFoundCharacters={setFoundCharacters}
          position={mousePosition}
        />
      )}
    </div>
  );
}
