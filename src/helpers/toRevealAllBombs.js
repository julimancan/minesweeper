export const toRevealAllBombs = (gridArray) => {
  return gridArray.map((row) =>
    row.map((tile) => {
      if (tile.isBomb) tile.isRevealed = true;
      return tile;
    })
  );
};
