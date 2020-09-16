export const checkForWinner = (gridArray) => {
  let isWinner = true;
  gridArray.forEach((row) => {
    row.forEach((tile) => {
      if (tile.isBomb && !tile.isFlagged) isWinner = false;
    });
  });

  return isWinner;
};
