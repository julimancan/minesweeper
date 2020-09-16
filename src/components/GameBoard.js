import React from 'react';
import Tile from './Tile';
import './GameBoard.css';
import { useStateValue } from '../context/StateProvider';
import { revealTiles } from '../helpers/revealTiles';

const GameBoard = () => {
  const [
    { rows, length, cols, gridArray, isGameOver },
    dispatch
  ] = useStateValue();

  function handleFlag(x, y) {
    let flag = !gridArray[x][y].isFlagged;
    dispatch({
      type: 'SET_FLAG',
      x,
      y,
      flag
    });
  }

  function handleReveal(x, y) {
    const updatedGrid = revealTiles(gridArray, x, y);
    dispatch({
      type: 'UPDATE_GRID',
      gridArray: updatedGrid
    });
  }

  return (
    <div className="gameboard__container">
      <div
        className="gameboard"
        style={{
          width: rows * length,
          height: cols * length
        }}
      >
        {gridArray.map((row, x) =>
          row.map((tile, y) => (
            <Tile
              key={x * cols + y}
              isBomb={tile.isBomb}
              isFlagged={tile.isFlagged}
              isRevealed={tile.isRevealed}
              neighborBombCount={tile.neighborBombCount}
              onClick={() => handleReveal(tile.posX, tile.posY)}
              onContextMenu={(e) => {
                e.preventDefault();
                handleFlag(tile.posX, tile.posY);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
