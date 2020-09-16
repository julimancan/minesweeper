import React from 'react';
import './Header.css';
import { useStateValue } from '../context/StateProvider';
import Timer from './Timer';

const Header = () => {
  const [{ totalBombs, flagCount }, dispatch] = useStateValue();

  return (
    <div className="header">
      <div className="header__difficulty">Medium</div>
      <div className="header__flags">
        <span role="img" aria-label="flag">
          🚩
        </span>
        : {totalBombs - flagCount}
      </div>
      <div className="header__timer">
        <Timer />
      </div>
    </div>
  );
};

export default Header;
