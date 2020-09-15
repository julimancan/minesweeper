import React from 'react';
import Tile from './Tile';
import './GameBoard.css';
import { useStateValue } from '../context/StateProvider';

const GameBoard = () => {
  const [{ rows, length, cols, gridArray }, dispatch] = useStateValue();

  function revealEmptyTiles(x, y) {
    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      for (let yoffset = -1; yoffset <= 1; yoffset++) {
        let i = x + xoffset;
        let j = y + yoffset;

        if (i > -1 && i < cols && j > -1 && j > -1 && j < rows) {
          let neighbour = gridArray[i][j];
          if (!neighbour.isRevealed) {
            dispatch({ type: 'REVEAL_TILE', x: i, y: j });
          }
        }
      }
    }
  }

  function revealTile(x, y) {
    dispatch({ type: 'REVEAL_TILE', x, y });
    if (gridArray[x][y].neighborBombCount === 0) {
      revealEmptyTiles(x, y);
    }
  }

  function handleFlag(x, y) {
    let flag = !gridArray[x][y].isFlagged;
    dispatch({
      type: 'SET_FLAG',
      x,
      y,
      flag
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
              onClick={() => revealTile(tile.posX, tile.posY)}
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
