import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <Tilt className="Tilt shadow-2 ma4 mt0" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
      <div className="Tilt-inner pa3">
        <img className="pa1" src={brain} alt="logo" width="100" height="100"></img>
      </div>
    </Tilt>
  );
};

export default Logo;