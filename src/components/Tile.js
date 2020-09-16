import React from 'react';
import './Tile.css';

import { numColorCode } from '../helpers/colorCode';

const Tile = ({
  isBomb,
  isFlagged,
  isRevealed,
  onClick,
  neighborBombCount,
  onContextMenu
}) => {
  const length = 30;
  function TileContent() {
    if (isBomb) return '💣';
    return neighborBombCount > 0 ? neighborBombCount : '';
  }
  return (
    <div
      className="tile"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: length,
        height: length,
        border: 'solid 1px grey',
        boxSizing: 'border-box',
        backgroundColor: isRevealed ? '#efefef' : 'white',
        color: numColorCode(neighborBombCount)
      }}
    >
      <div>{isRevealed ? <TileContent /> : isFlagged && '🚩'}</div>
    </div>
  );
};

export default Tile;
