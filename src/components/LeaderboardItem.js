import React from "react";
import { secondsToTime } from "./Timer";

export default function LeaderboardItem(props) {
  return (
    <tr>
      <td>{props.position}</td>
      <td>{props.user}</td>
      <td>{secondsToTime(props.score)}</td>
    </tr>
  );
}
