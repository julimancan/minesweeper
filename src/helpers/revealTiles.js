export function revealTiles(prevGridArray, x, y) {
  const gridArray = [...prevGridArray];
  const rows = gridArray.length;
  const cols = gridArray[0].length;

  function revealEmptyTiles(x, y) {
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
  }

  function revealTile(x, y) {
    gridArray[x][y].isRevealed = true;
    if (gridArray[x][y].neighborBombCount === 0) {
      revealEmptyTiles(x, y);
    }
  }

  revealTile(x, y);

  return gridArray;
}
