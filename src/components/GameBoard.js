import React from 'react';
import Tile from './Tile';
import './GameBoard.css';
import { useStateValue } from '../context/StateProvider';
import { revealTiles } from '../helpers/revealTiles';
import { setFlag } from '../helpers/setFlag';

const GameBoard = () => {
  const [
    { rows, length, cols, gridArray, isGameOver, flagCount, totalBombs },
    dispatch
  ] = useStateValue();

  function handleFlag(x, y) {
    let updatedGrid;
    let updateFlagAccount = flagCount;
    const tile = gridArray[x][y];
    if (isGameOver) return;
    if (!tile.isRevealed) {
      if (!tile.isFlagged) {
        if (flagCount - totalBombs !== 0) {
          updatedGrid = setFlag(gridArray, x, y, true);
          updateFlagAccount++;
          dispatch({
            type: 'SET_FLAG',
            gridArray: updatedGrid,
            flagCount: updateFlagAccount
          });
        }
      } else {
        console.log('unsetting');
        updatedGrid = setFlag(gridArray, x, y, false);
        updateFlagAccount--;
        dispatch({
          type: 'SET_FLAG',
          gridArray: updatedGrid,
          flagCount: updateFlagAccount
        });
      }
      console.log(flagCount);
    }
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
