// default state for all tiles to be initialized from
const tileState = {
  isRevealed: false,
  isBomb: false,
  isFlagged: false,
  posX: 0,
  posY: 0,
  neighborBombCount: 0
};

export function boardSetup(initState) {
  const { cols, rows, totalBombs } = initState.boardOptions;

  //generate 2d array based on colrs & rows with tile elements
  let gridArray = [];
  for (let i = 0; i < cols; i++) {
    let row = [];
    for (let j = 0; j < rows; j++) {
      row.push({ ...tileState, posX: i, posY: j });
    }
    gridArray.push(row);
  }

  //generate all possible options of placing bombs
  const bombOptions = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      bombOptions.push([i, j]);
    }
  }

  //randomly set isBomb property on the grid based on totalBombs to be placed
  for (let n = 0; n < totalBombs; n++) {
    let index = Math.floor(Math.random() * bombOptions.length);
    let selected = bombOptions[index];
    let i = selected[0];
    let j = selected[1];
    bombOptions.splice(index, 1);
    gridArray[i][j].isBomb = true;
  }

  //assign bomb count to all the tiles in the grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      gridArray[i][j].neighborBombCount = assignBombCount(i, j);
    }
  }

  function assignBombCount(x, y) {
    const tile = gridArray[x][y];
    if (tile.isBomb) {
      //if tile is a bomb itself no need to count the neighbour count
      return -1;
    }

    let total = 0;

    //select all 8 possible tiles around the given tile and loop through them
    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      for (let yoffset = -1; yoffset <= 1; yoffset++) {
        let i = x + xoffset;
        let j = y + yoffset;

        //make sure we are still within the boundaries
        if (i > -1 && i < cols && j > -1 && j < rows) {
          let neighbour = gridArray[i][j];
          if (neighbour.isBomb) {
            total++;
          }
        }
      }
    }
    return total;
  }

  return { ...initState, gridArray };
}
