import React from 'react';
import './Tile.css';

const Tile = ({ tileState }) => {
  const length = 30;
  return (
    <div
      style={{
        width: length,
        height: length,
        border: 'solid 1px grey',
        boxSizing: 'border-box'
      }}
    >
      {tileState.isBomb && '💣'}
    </div>
  );
};

export default Tile;
