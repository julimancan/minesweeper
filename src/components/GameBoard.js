import React, { useState } from 'react';
import Tile from './Tile';
import './GameBoard.css';

const rows = 16;
const cols = 16;
const length = 30;

const totalBomb = 40;

const tileState = {
  isRevealed: false,
  isBomb: false,
  isFlagged: false,
  posX: 0,
  posY: 0,
  neighborBombCount: 0
};

const gridArray = [];

for (let i = 0; i < cols; i++) {
  let row = [];
  for (let j = 0; j < rows; j++) {
    row.push({ ...tileState, posX: i, posY: j });
  }
  gridArray.push(row);
}

const bombOptions = [];

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    bombOptions.push([i, j]);
  }
}

for (let n = 0; n < totalBomb; n++) {
  let index = Math.floor(Math.random() * bombOptions.length);

  let selected = bombOptions[index];

  let i = selected[0];
  let j = selected[1];
  bombOptions.splice(index, 1);

  gridArray[i][j].isBomb = true;
}

console.log(gridArray);

function assignBombCount(x, y) {
  const tile = gridArray[x][y];
  if (tile.isBomb) {
    return -1;
  }

  let total = 0;
  for (let xoffset = -1; xoffset <= 1; xoffset++) {
    for (let yoffset = -1; yoffset <= 1; yoffset++) {
      let i = x + xoffset;
      let j = y + yoffset;

      if (i > -1 && i < cols && j > -1 && j > -1 && j < rows) {
        let neighbour = gridArray[i][j];
        if (neighbour.isBomb) {
          total++;
        }
      }
    }
  }
  return total;
}

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    gridArray[i][j].neighborBombCount = assignBombCount(i, j);
  }
}

const GameBoard = () => {
  const [grid, updateGrid] = useState(gridArray);

  function revealTile(x, y) {
    const toUpdate = [...grid];
    toUpdate[x][y].isRevealed = true;
    updateGrid([...toUpdate]);
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
        {grid.map((row, x) =>
          row.map((tile, y) => (
            <Tile
              key={x * cols + y}
              isBomb={tile.isBomb}
              isFlagged={tile.isFlagged}
              isRevealed={tile.isRevealed}
              onClick={() => revealTile(tile.posX, tile.posY)}
              neighborBombCount={tile.neighborBombCount}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameBoard;
