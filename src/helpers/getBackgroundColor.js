export const getBackgroundColor = (x, y, revealed) => {
  if (x % 2 === 0 && y % 2 === 0) {
    return revealed ? '#e5c29f' : '#BFE17E';
  } else if (x % 2 === 0 && y % 2 !== 0) {
    return revealed ? '#d7b899' : '#A2D149';
  } else if (x % 2 !== 0 && y % 2 === 0) {
    return revealed ? '#d7b899' : '#A2D149';
  } else {
    return revealed ? '#e5c29f' : '#BFE17E';
  }
};
