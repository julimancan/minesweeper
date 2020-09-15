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

for (let i = 0; i < rows; i++) {
  let row = [];
  for (let j = 0; j < cols; j++) {
    row.push({ ...tileState, posX: i, posY: j });
  }
  gridArray.push(row);
}

gridArray[0][5].isFlagged = true;

const bombOptions = [];

for (let i = 0; i < cols; i++) {
  for (let j = 0; j < rows; j++) {
    bombOptions.push([i, j]);
  }
}

console.log(bombOptions);

for (let n = 0; n < totalBomb; n++) {
  let index = Math.floor(Math.random() * bombOptions.length);

  let selected = bombOptions[index];

  let i = selected[0];
  let j = selected[1];
  bombOptions.splice(index, 1);

  gridArray[i][j].isBomb = true;
}

console.log(gridArray);

const GameBoard = () => {
  const [grid, updateGrid] = useState(gridArray);

  return (
    <div className="gameboard__container">
      <div
        className="gameboard"
        style={{
          width: rows * length,
          height: cols * length
        }}
      >
        {grid.map((row) => row.map((tile) => <Tile tileState={tile} />))}
      </div>
    </div>
  );
};

export default GameBoard;
