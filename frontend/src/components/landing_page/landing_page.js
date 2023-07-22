import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = (props) => {
  useEffect(() => {
    document.title = "Typing Showdown | Home";
    props.fetchLeaderboardRaces();
    props.fetchRecentRaces();
  }, [props]);

  const getLeaderboardRaces = () => {
    return (
      <ul>
        <li className="headers flex">
          <div className="leaderboard-index">Rank</div>
          <div>User</div>
          <div>Date</div>
          <div>Speed</div>
        </li>
        {props.leaderboardRaces.map((race, idx) => {
          let date = new Date(race.date);
          return (
            <li key={idx} className="flex">
              <div>{idx + 1}</div>
              <div>
                <Link to={`/${race.username}`}>{race.username}</Link>
              </div>
              <div>{`${date.toLocaleDateString()}`}</div>
              <div>{race.averageSpeed} wpm</div>
            </li>
          );
        })}
      </ul>
    );
  };

  const getRecentRaces = () => {
    return (
      <ul>
        <li className="headers flex">
          <div className="leaderboard-index">Date</div>
          <div>Winner</div>
          <div>Num Players</div>
          <div>Top Speed</div>
          <div>Race</div>
        </li>
        {props.recentRaces.map((race, idx) => {
          let date = new Date(race.date);
          return (
            <li key={idx} className="flex">
              <div>{`${date.toLocaleDateString()}`}</div>
              <div>
                <Link to={`/${race.winner}`}>{race.winner}</Link>
              </div>
              <div>{race.numRaces}</div>
              <div>{race.topSpeed} wpm</div>
              <div>
                <Link to={`/race/${race._id}`}>Details</Link>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="landing-page-container flex-column">
      <div className='landing-page-links landing-page-box flex-column'>
        <h2>Join a typing showdown</h2>
        <div className="flex">
          <Link to={"/game"}>
            <button className="button">Solo Mode</button>
          </Link>
          <Link to={"/waiting-room"}>
            <button className="button pulse">Multiplayer Mode</button>
          </Link>
        </div>
      </div>
      <div className="landing-page-leaderboard-container flex">
        <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
          <h2>Global Leaderboard</h2>
          {props.leaderboardRaces[0] ? getLeaderboardRaces() : <p>No Showdowns Found</p>}
        </div>
        <div className="landing-page-leaderboard landing-page-box leaderboard flex-column">
          <h2>Recent Global Showdowns</h2>
          {props.recentRaces[0] ? getRecentRaces() : <p>No Showdowns Found</p>}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
