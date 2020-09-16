import React from 'react';
import './Tile.css';

import { numColorCode } from '../helpers/colorCode';
import { getBackgroundColor } from '../helpers/getBackgroundColor';

const Tile = ({ tile, onClick, onContextMenu, length }) => {
  const { isBomb, isFlagged, isRevealed, neighborBombCount, posX, posY } = tile;

  //mini component to simplify nested conditional renders
  const TileContent = () => {
    if (isBomb) return '💣';
    return neighborBombCount > 0 ? neighborBombCount : '';
  };

  return (
    <div
      data-testid={isBomb ? 'bomb' : isRevealed ? 'revealed' : 'hidden'}
      className="tile"
      onClick={onClick}
      onContextMenu={onContextMenu}
      style={{
        width: length,
        height: length,
        backgroundColor: isRevealed //get background color based on if cell is hidden or revealed
          ? getBackgroundColor(posX, posY, true) //revealed
          : getBackgroundColor(posX, posY), //hidden
        color: numColorCode(neighborBombCount)
      }}
    >
      <div>{isRevealed ? <TileContent /> : isFlagged && '🚩'}</div>
    </div>
  );
};

export default Tile;
