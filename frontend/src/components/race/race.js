import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SkillLevelContainer from "../profile/skill";

const Race = (props) => {
  const [date, setDate] = useState("Loading");
  const [topSpeed, setTopSpeed] = useState(0);

  useEffect(() => {
    document.title = "Rocket Typer | Race";

    props.fetchRace(props.raceId)
      .then(res => {
        res.race.data.forEach(user => {
          const newDate = new Date(user.date);
          if (parseInt(user.averageSpeed) > topSpeed) {
            setTopSpeed(user.averageSpeed);
          }
          setDate(newDate.toLocaleDateString());
        });
      });
  }, [props.raceId, props.fetchRace, topSpeed, props]);

  const getRace = () => {
    const users = props.users.map((user, idx) => (
      <li key={idx} className="flex">
        <div>{idx + 1}</div>
        <div><Link to={`/${user.username}`}>{user.username}</Link></div>
        <div>{user.averageSpeed} wpm</div>
        <div>{user.accuracy}%</div>
        <div>
          <button onClick={() => props.openModal({ type: 'ranks' })}>
            <SkillLevelContainer wpm={user.averageSpeed} />
          </button>
        </div>
      </li>
    ));

    return (
      <ul>
        <li className="headers flex">
          <div className="leaderboard-index">Place</div>
          <div>User</div>
          <div>Speed</div>
          <div>Accuracy</div>
          <div>Skill Level</div>
        </li>
        {users}
      </ul>
    );
  };

  return (
    <div className="race-page-container flex-column">
      <div className="profile-page-header">
        <h2>Race</h2>
      </div>
      <div className="race-page-info-container flex">
        <div className="race-page-info-item flex-column" >
          <h2>Total Players</h2>
          <p>{props.users.length}</p>
        </div>
        <div className="race-page-info-item flex-column" >
          <h2>Winner</h2>
          <p>{props.winner}</p>
        </div>
        <div className="race-page-info-item flex-column" >
          <h2>Top Speed</h2>
          <p>{topSpeed}wpm</p>
        </div>
        <div className="race-page-info-item flex-column" >
          <h2>Date</h2>
          <p>{date}</p>
        </div>
      </div>
      <div className="race-page-leaderboard leaderboard flex-column">
        <h2>Players</h2>
        {props.users[0] ? getRace() : <p>No Users Found</p>}
      </div>
    </div>
  );
};

export default Race;
