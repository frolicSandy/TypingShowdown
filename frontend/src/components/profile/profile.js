import React, { useEffect, useState } from 'react';
import SkillLevelContainer from "./skill";
import { Link } from 'react-router-dom';

const Profile = (props) => {
  const [username, setUsername] = useState(props.match.params.username || props.user.username);
  const [numRaces, setNumRaces] = useState(" ");
  const [avgSpeed, setAvgSpeed] = useState(" ");
  const [maxSpeed, setMaxSpeed] = useState(" ");
  const [memberSince, setMemberSince] = useState(" ");

  useEffect(() => {
    document.title = `Typing Showdown | ${username}`;
    props.fetchRaces(username);
    props.fetchUserStats(username)
      .then(res => {
        if (res.userStats.data[0]) {
          const numRaces = Math.floor(res.userStats.data[0].numRaces);
          const avgSpeed = Math.floor(res.userStats.data[0].avgSpeed);
          const maxSpeed = Math.floor(res.userStats.data[0].maxSpeed);
          setNumRaces(numRaces);
          setAvgSpeed(avgSpeed);
          setMaxSpeed(maxSpeed);
        }
      });
    props.fetchUserDate(username)
      .then(res => {
        if (res.userStats.data.signupDate) {
          const date = new Date(res.userStats.data.signupDate);
          setMemberSince(date.toDateString());
        }
      })
      .then(() => props.closeModal());
  }, [username, props]);

  useEffect(() => {
    props.fetchRaces(username);
  }, [props.location.pathname, username, props]);

  const getRaces = () => {
    const races = props.races.map((race, idx) => {
      const date = new Date(race.date);
      return (
        <li key={idx} className="flex">
          <div>{idx + 1}</div>
          <div>{`${date.toLocaleDateString()}`}</div>
          <div>{race.averageSpeed} wpm</div>
          <div>{race.accuracy}%</div>
          <div><Link to={`/race/${race.raceId}`}>Details</Link></div>
        </li>
      );
    });

    return (
      <ul>
        <li className="headers flex">
          <div className="leaderboard-index">Rank</div>
          <div>Date</div>
          <div>Speed</div>
          <div>Accuracy</div>
          <div>Race</div>
        </li>
        {races}
      </ul>
    );
  };

  return (
    <div className="profile-container flex-column">
      <div className="profile-page flex-column">
        <div className="profile-page-header" >
          <h2>{`${username}'s Profile`}</h2>
        </div>
        <div className="profile-info-container flex">
          <div className="profile-page-info-item flex-column" >
            <h2>Skill level</h2>
            <button onClick={() => props.openModal({ type: 'ranks' })}>
              <SkillLevelContainer wpm={avgSpeed} />
            </button>
          </div>
          <div className="profile-page-info-item flex-column" >
            <h2>Member Since</h2>
            <p>{memberSince}</p>
          </div>
        </div>
        <div className="profile-page-stats flex">
          <div className="profile-page-stats-item flex-column" >
            <h3>Total Races</h3>
            <h3>{numRaces}</h3>
          </div>
          <div className="profile-page-stats-item flex-column" >
            <h3>Average Speed</h3>
            <h3>{`${avgSpeed} wpm`}</h3>
          </div>
          <div className="profile-page-stats-item flex-column" >
            <h3>Max Speed</h3>
            <h3>{`${maxSpeed} wpm`}</h3>
          </div>
        </div>
        <div className="profile-page-leaderboard leaderboard flex-column">
          <h2>Top 10 races</h2>
          {props.races[0] ? getRaces() : <h3>N/A</h3>}
        </div>
      </div>
    </div>
  );
};

export default Profile;
