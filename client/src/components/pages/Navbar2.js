import React from 'react';
import { Link } from 'react-router-dom';

function Navbar2() {
  return (
    <nav>
        <img src='imgs/kitsune-head-logo.png' id='kitsu' alt='kitsunelogo'/>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/previousEvents">Previous Events</Link></li>
        <li><Link to="/cosplayCompetitionRules">Cosplay Competition Rules</Link></li>
        <li><Link to="/articles">Articles</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar2;
