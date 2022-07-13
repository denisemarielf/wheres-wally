import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import "../assets/styles/GetUserName.css";
import { secondsToTime } from "./Timer";

export default function GetUsername(props) {
  const [userInfo, setUserInfo] = useState({
    user: "",
    time: props.counter,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  async function addUserInfo(name, time) {
    await addDoc(collection(db, "users"), {
      name: name,
      time: time,
    });
  }

  function handleChange(e) {
    setUserInfo((prevState) => {
      return { ...prevState, user: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addUserInfo(userInfo.user, userInfo.time);
    setFormSubmitted(true);
  }

  return (
    <div className="end-game-container">
      <div className="end-game-popup">
        <h2>Congrats!</h2>
        <p>You finished the game in {secondsToTime(userInfo.time)}</p>

        {!formSubmitted && (
          <form className="end-game-form" onSubmit={handleSubmit}>
            <label>Enter your name:</label>
            <input onChange={handleChange} placeholder="Name"></input>
            <span className="end-game-form-buttons-container">
              <button type="submit">Add my score</button>
              <button
                type="button"
                onClick={() => props.setDisplayLeaderboard(true)}
              >
                See leaderboard
              </button>
            </span>
          </form>
        )}

        {formSubmitted && (
          <div className="position-submitted-container">
            <p>{userInfo.user}, your position was submitted.</p>
            <button
              className="button-see-leaderboard"
              type="button"
              onClick={() => props.setDisplayLeaderboard(true)}
            >
              See leaderboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
