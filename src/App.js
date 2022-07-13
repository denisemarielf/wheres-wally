import React, { useState } from "react";
import Image from "./components/Image";
import Header from "./components/Header";
import "./assets/styles/App.css";
import Leaderboard from "./components/Leaderboard";
import Confetti from "react-confetti";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [wonGame, setWonGame] = useState(false);
  const [displayLeaderboard, setDisplayLeaderboard] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <>
      {wonGame && !displayLeaderboard && (
        <Confetti
          width={1360}
          height={1000}
          numberOfPieces={500}
          recycle={false}
        />
      )}
      <Header
        setDisplayLeaderboard={setDisplayLeaderboard}
        displayLeaderboard={displayLeaderboard}
        wonGame={wonGame}
        counter={counter}
        setCounter={setCounter}
        startGame={startGame}
        setWonGame={setWonGame}
        setStartGame={setStartGame}
      />
      <main>
        {!displayLeaderboard && (
          <Image
            setDisplayLeaderboard={setDisplayLeaderboard}
            counter={counter}
            wonGame={wonGame}
            setWonGame={setWonGame}
            startGame={startGame}
            setStartGame={setStartGame}
          />
        )}
        {displayLeaderboard && <Leaderboard />}
      </main>
    </>
  );
}

export default App;
