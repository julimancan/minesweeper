export const revealTiles = (prevGridArray, x, y) => {
  //using recursion reveal all adjacent empty tiles that have not been revealed previously
  const revealEmptyTiles = (x, y) => {
    for (let xoffset = -1; xoffset <= 1; xoffset++) {
      for (let yoffset = -1; yoffset <= 1; yoffset++) {
        let i = x + xoffset;
        let j = y + yoffset;

        if (i > -1 && i < cols && j > -1 && j > -1 && j < rows) {
          let neighbour = gridArray[i][j];
          if (!neighbour.isRevealed) {
            revealTile(i, j);
          }
        }
      }
    }
  };

  //reveal single tile
  const revealTile = (x, y) => {
    if (gridArray[x][y].isFlagged) return;
    gridArray[x][y].isRevealed = true;
    //if tile is empty call the revealEmptyTiles
    if (gridArray[x][y].neighborBombCount === 0) {
      revealEmptyTiles(x, y);
    }
  };

  const gridArray = [...prevGridArray];
  const rows = gridArray.length;
  const cols = gridArray[0].length;

  revealTile(x, y);

  return gridArray;
};
