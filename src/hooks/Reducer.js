export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  REVEAL_TILE: 'REVEAL_TILE',
  REVEAL_EMPTY_TILES: 'REVEAL_EMPTY_TILES',
  SET_FLAG: 'SET_FLAG'
};

const reducer = (state, action) => {
  const toUpdate = [...state.gridArray];
  switch (action.type) {
    case actionTypes.UPDATE_GRID:
      return {
        ...state,
        gridArray: [...action.gridArray]
      };
    case actionTypes.REVEAL_TILE:
      toUpdate[action.x][action.y].isRevealed = true;
      return {
        ...state,
        gridArray: [...toUpdate]
      };
    case actionTypes.SET_FLAG:
      toUpdate[action.x][action.y].isFlagged = action.flag;
      return {
        ...state,
        gridArray: [...toUpdate]
      };

    default:
      return state;
  }
};

export default reducer;
