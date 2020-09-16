export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  SET_FLAG: 'SET_FLAG'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRID:
      return {
        ...state,
        gridArray: [...action.gridArray]
      };

    default:
      return state;
  }
};

export default reducer;
