import React from 'react';
import { useStateValue, initialState } from '../context/StateProvider';

const GameBanner = () => {
  const [{ isGameOver, isGameActive }, dispatch] = useStateValue();
  function startGame() {
    dispatch({ type: 'START_GAME' });
  }
  function resetGame() {
    dispatch({ type: 'RESET_GAME', payload: initialState });
  }
  return (
    <div>
      {isGameOver && (
        <span>
          Game is over!
          <button type="button" class="nes-btn is-warning" onClick={resetGame}>
            Warning
          </button>
        </span>
      )}

      {!isGameOver && !isGameActive && (
        <span>
          Ready for Challenge!
          <button type="button" class="nes-btn is-success" onClick={startGame}>
            Start
          </button>
        </span>
      )}
    </div>
  );
};

export default GameBanner;
