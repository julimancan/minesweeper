import React from 'react';

import Tile from './Tile';

import './GameBoard.css';

import { useStateValue } from '../context/StateProvider';
import { revealTiles } from '../helpers/revealTiles';
import { setFlag } from '../helpers/setFlag';
import { checkForWinner } from '../helpers/checkForWinner';

const GameBoard = () => {
  const [state, dispatch] = useStateValue();
  const { boardOptions, gridArray, flagCount, isGameActive } = state;
  const { rows, length, cols, totalBombs } = boardOptions;

  function handleFlag(x, y) {
    if (!isGameActive) return;

    const tile = gridArray[x][y];

    if (!tile.isRevealed) {
      let updateFlagAccount = flagCount;
      let updatedGrid = null;

      if (!tile.isFlagged) {
        //if we have flag remaining
        if (flagCount - totalBombs !== 0) {
          updatedGrid = setFlag(gridArray, x, y, true); //assign the flag to the tile and return updated grid
          updateFlagAccount++; //update the flag counter
          if (checkForWinner(updatedGrid)) {
            //check if all flags have been placed at bomb mines
            dispatch({
              type: 'SET_WINNER'
            });
          }
        }
      } else {
        //if tile is flagged, unflag it
        updatedGrid = setFlag(gridArray, x, y, false);
        updateFlagAccount--;
      }
      if (updatedGrid) {
        dispatch({
          //update the state with new grid data
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
    if (tile.isBomb === true) dispatch({ type: 'SET_GAME_OVER' }); //user clicked on a bomb
    const updatedGrid = revealTiles(gridArray, x, y); //user helper function reveal the tile (or tiles if it is an empty one)
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
          //dynamically set the width of the board based on length of the tile, and rows & cols
          width: rows * length + 2,
          height: cols * length
        }}
      >
        {gridArray.map((row, x) =>
          row.map((tile, y) => (
            <Tile
              key={x * cols + y}
              tile={tile}
              length={length}
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
