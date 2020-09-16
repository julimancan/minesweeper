import React from 'react';
import Tile from './Tile';
import './GameBoard.css';
import { useStateValue } from '../context/StateProvider';
import { revealTiles } from '../helpers/revealTiles';
import { setFlag } from '../helpers/setFlag';
import { checkForWinner } from '../helpers/checkForWinner';

const GameBoard = () => {
  const [
    { rows, length, cols, gridArray, flagCount, totalBombs, isGameActive },
    dispatch
  ] = useStateValue();

  function handleFlag(x, y) {
    let updatedGrid;
    let updateFlagAccount = flagCount;
    const tile = gridArray[x][y];
    if (!isGameActive) return;
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
          if (checkForWinner(updatedGrid)) {
            dispatch({
              type: 'SET_WINNER'
            });
          }
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
    }
  }

  function handleReveal(x, y) {
    const tile = gridArray[x][y];
    if (!isGameActive || tile.isRevealed) return;
    if (tile.isBomb === true) dispatch({ type: 'SET_GAME_OVER' });
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
          width: rows * length + 2,
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
              posX={tile.posX}
              posY={tile.posY}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
