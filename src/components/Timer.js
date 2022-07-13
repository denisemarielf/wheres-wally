import React, { useEffect } from "react";

export function secondsToTime(seconds) {
  const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(1, "0"),
    s = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");

  return m + ":" + s;
}

export function Timer(props) {
  useEffect(() => {
    let counterInterval;
    counterInterval = setInterval(() => {
      props.setCounter((prevState) => prevState + 1);
    }, 1000);

    return function cleanup() {
      clearInterval(counterInterval);
    };
  }, []);

  return <div>Time: {secondsToTime(props.counter)}</div>;
}
