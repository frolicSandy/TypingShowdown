import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const [numRaces, setNumRaces] = useState(props.numRaces);
  const [avgSpeed, setAvgSpeed] = useState(props.avgSpeed);

  useEffect(() => {
    if (props.loggedIn) {
      props.fetchUserStats(props.user.username).then((res) => {
        if (res.userStats) {
          const userStatsData = res.userStats.data[0];
          const numRaces = userStatsData ? userStatsData.numRaces : 0;
          const avgSpeed = userStatsData ? Math.floor(userStatsData.avgSpeed) : 0;
          setNumRaces(numRaces);
          setAvgSpeed(avgSpeed);
        }
      });
    }
  }, [props.loggedIn, props.user.username, props.fetchUserStats, props]);

  const logoutCurrentUser = (e) => {
    props.logout();
  };

  const getLinks = () => {
    if (props.loggedIn) {
      return (
        <div className="modal-buttons flex">
          <span className="nav-bar-stats flex">
            <div className="nav-bar-stats-item">
              Welcome <span><Link to={'/profile'}>{props.user.username}</Link></span>
            </div>
            <div className="nav-bar-stats-item">Total Races <span>{numRaces}</span></div>
            <div className="nav-bar-stats-item">Average Speed <span>{avgSpeed} WPM</span></div>
            <div className="nav-bar-stats-item"><span><Link to={'/profile'}>Your Profile</Link></span></div>
            <div className="nav-bar-stats-item logout-button" onClick={logoutCurrentUser}>Logout</div>
          </span>
        </div>
      );
    } else {
      return (
        <div className="modal-buttons flex">
          <button className="button" onClick={() => props.openModal({ type: 'login' })}>Login</button>
          <button className="button" onClick={() => props.openModal({ type: 'signup' })}>Signup</button>
        </div>
      );
    }
  };

  return (
    <div className="navbar-container flex">
      <div className="navbar-logo">
        <Link to={'/'}>
          <i className="fas fa-regular fa-keyboard"></i>
          <span className="logo">Typing Showdown</span>
        </Link>
      </div>
      {getLinks()}
    </div>
  );
};

export default NavBar;
