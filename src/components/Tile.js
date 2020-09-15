import React from 'react';
import './Tile.css';

const Tile = ({
  isBomb,
  isFlagged,
  isRevealed,
  onClick,
  neighborBombCount
}) => {
  const length = 30;
  return (
    <div
      className="tile"
      onClick={onClick}
      style={{
        width: length,
        height: length,
        border: 'solid 1px grey',
        boxSizing: 'border-box',
        backgroundColor: isRevealed ? '#efefef' : 'white'
      }}
    >
      {isRevealed && <div> {isBomb ? '💣' : neighborBombCount}</div>}
    </div>
  );
};

export default Tile;
