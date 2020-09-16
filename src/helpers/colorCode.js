export const numColorCode = (value) => {
  const colorArray = [
    '#1976d2',
    '#388d3c',
    '#d33030',
    '#7c21a2',
    '#1976d2',
    '#1976d2'
  ];
  return value < 6 ? colorArray[value + 1] : 'white';
};
