export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  SET_FLAG: 'SET_FLAG',
  SET_GAME_OVER: 'SET_GAME_OVER'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRID:
      return {
        ...state,
        gridArray: [...action.gridArray]
      };
    case actionTypes.SET_GAME_OVER:
      return {
        ...state,
        isGameOver: true
      };
    default:
      return state;
  }
};

export default reducer;
