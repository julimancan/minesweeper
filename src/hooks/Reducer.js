export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  SET_GAME_OVER: 'SET_GAME_OVER',
  SET_FLAG: 'SET_FLAG'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRID:
      return {
        ...state,
        gridArray: [...action.gridArray]
      };
    case actionTypes.SET_FLAG:
      return {
        ...state,
        flagCount: action.flagCount,
        gridArray: [...action.gridArray]
      };
    case actionTypes.SET_GAME_OVER:
      const toRevealBomb = state.gridArray.map((row) =>
        row.map((tile) => {
          if (tile.isBomb) tile.isRevealed = true;
          return tile;
        })
      );

      return {
        ...state,
        gridArray: toRevealBomb,
        isGameOver: true
      };
    default:
      return state;
  }
};

export default reducer;
