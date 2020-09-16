export const checkForWinner = (gridArray) => {
  let isWinner = true;
  gridArray.forEach((row) => {
    row.forEach((tile) => {
      //if a tile with a bomb without any flag is found, means user is yet to become the winner
      if (tile.isBomb && !tile.isFlagged) isWinner = false;
    });
  });

  return isWinner;
};
