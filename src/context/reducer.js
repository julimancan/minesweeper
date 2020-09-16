import { boardSetup } from '../helpers/boardSetup';
import { toRevealAllBombs } from '../helpers/toRevealAllBombs';

export const actionTypes = {
  UPDATE_GRID: 'UPDATE_GRID',
  START_GAME: 'START_GAME',
  RESET_GAME: 'RESET_GAME',
  SET_GAME_OVER: 'SET_GAME_OVER',
  SET_FLAG: 'SET_FLAG',
  SET_TIMER: 'SET_TIMER',
  SET_WINNER: 'SET_WINNER'
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
      //reveal all bombs on game over
      return {
        ...state,
        gridArray: toRevealAllBombs(state.gridArray),
        isGameActive: false,
        isGameOver: true
      };
    case actionTypes.START_GAME:
      return {
        ...state,
        isGameActive: true
      };
    case actionTypes.RESET_GAME:
      return {
        ...boardSetup(action.payload),
        isGameActive: true
      };
    case actionTypes.SET_TIMER:
      return {
        ...state,
        timeElapsed: action.time
      };
    case actionTypes.SET_WINNER:
      return {
        ...state,
        isGameActive: false,
        isGameOver: true,
        isWinner: true
      };
    default:
      return state;
  }
};

export default reducer;
