import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import LeaderboardItem from "./LeaderboardItem";
import "../assets/styles/Leaderboard.css";

export default function Leaderboard(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  function compare(a, b) {
    return (a.time > b.time) - (a.time < b.time);
  }

  const sortedUsers = users.sort(compare);

  const displayUsers = sortedUsers.map((item, index) => {
    return (
      <LeaderboardItem
        position={index + 1}
        key={item.id}
        user={item.name}
        score={item.time}
      />
    );
  });

  return (
    <div className="leaderboard">
      <div className="leaderboard-content">
        <h1>Leaderboard</h1>
        <div className="tbl-header">
          <table cellPadding="0" cellSpacing="0" border="0">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table cellPadding="0" cellSpacing="0" border="0">
            <tbody>{displayUsers}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
