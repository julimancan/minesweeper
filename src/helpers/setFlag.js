export function setFlag(prevGridArray, x, y, status) {
  const gridArray = [...prevGridArray];
  gridArray[x][y].isFlagged = status;
  return gridArray;
}
