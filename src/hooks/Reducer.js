export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  REVEAL_TILE: 'REVEAL_TILE',
  REVEAL_EMPTY_TILES: 'REVEAL_EMPTY_TILES'
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_GRID:
      return {
        ...state,
        gridArray: [...action.gridArray]
      };
    case actionTypes.REVEAL_TILE:
      const toUpdate = [...state.gridArray];
      toUpdate[action.x][action.y].isRevealed = true;
      return {
        ...state,
        gridArray: [...toUpdate]
      };

    default:
      return state;
  }
};

export default reducer;
