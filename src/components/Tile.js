import React from 'react';
import './Tile.css';

import { numColorCode } from '../helpers/colorCode';
import { getBackgroundColor } from '../helpers/getBackgroundColor';

const Tile = ({ tile, onClick, onContextMenu, length }) => {
  const { isBomb, isFlagged, isRevealed, neighborBombCount, posX, posY } = tile;

  const TileContent = () => {
    if (isBomb) return '💣';
    return neighborBombCount > 0 ? neighborBombCount : '';
  };

  return (
    <div
      className="tile"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: length,
        height: length,
        backgroundColor: isRevealed
          ? getBackgroundColor(posX, posY, true)
          : getBackgroundColor(posX, posY),
        color: numColorCode(neighborBombCount)
      }}
    >
      <div>{isRevealed ? <TileContent /> : isFlagged && '🚩'}</div>
    </div>
  );
};

export default Tile;
