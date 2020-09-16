import React from 'react';
import Tile from './Tile';
import './GameBoard.css';
import { useStateValue } from '../context/StateProvider';
import { revealTiles } from '../helpers/revealTiles';

const GameBoard = () => {
  const [
    { rows, length, cols, gridArray, isGameOver },
    dispatch,
    remaningFlagCount
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
    const tile = gridArray[x][y];
    if (isGameOver || tile.isRevealed || tile.isFlagged) return;
    if (tile.isBomb === true) dispatch({ type: 'SET_GAME_OVER' });
    const updatedGrid = revealTiles(gridArray, x, y);
    dispatch({
      type: 'UPDATE_GRID',
      gridArray: updatedGrid
    });
  }

  return (
    <>
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
      <div>{isGameOver && <span>Game is over!</span>}</div>
    </>
  );
};

export default GameBoard;
