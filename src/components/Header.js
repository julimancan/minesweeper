import React from 'react';
import './Header.css';
import { useStateValue } from '../context/StateProvider';
import Timer from './Timer';

const Header = () => {
  const [{ boardOptions, flagCount }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__difficulty">Medium</div>
      <div className="header__flag">
        <span role="img" aria-label="flag">
          🚩
        </span>
        : {boardOptions.totalBombs - flagCount}
      </div>
      <div className="header__timer">
        <Timer />
      </div>
    </div>
  );
};

export default Header;
