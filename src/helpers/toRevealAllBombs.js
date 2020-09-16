export const toRevealAllBombs = (gridArray) => {
  //loop through gridArray set isRevealed for all tiles which contains bomb
  return gridArray.map((row) =>
    row.map((tile) => {
      if (tile.isBomb) tile.isRevealed = true;
      return tile;
    })
  );
};
