import React from 'react';
import './Header.css';
import { useStateValue } from '../context/StateProvider';

const Header = () => {
  const [{ totalFlags }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__difficulty">Medium</div>
      <div className="header__flags">
        Flags : {totalFlags}
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
