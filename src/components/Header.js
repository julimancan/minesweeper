import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header__difficulty">Medium</div>
      <div className="header__flags">
        Flags
        <span role="img" aria-label="flag">
          🚩
        </span>
      </div>
      <div className="header__timer">000</div>
      <div className="header__social">Share</div>
    </div>
  );
};

export default Header;
