import React from 'react';
import { useStateValue, initialState } from '../context/StateProvider';
import './GameBanner.css';

const GameBanner = () => {
  const [{ isGameOver, isGameActive, isWinner }, dispatch] = useStateValue();
  function startGame() {
    dispatch({ type: 'START_GAME' });
  }
  function resetGame() {
    dispatch({ type: 'RESET_GAME', payload: initialState });
  }
  return (
    <div className="gamebanner">
      {isGameOver && (
        <span>
          {isWinner ? 'You won!' : 'Game is over!'}
          <button
            type="button"
            className="nes-btn is-warning"
            onClick={resetGame}
          >
            Restart
          </button>
        </span>
      )}

      {!isGameOver && !isGameActive && (
        <span>
          Ready for Challenge!
          <button
            type="button"
            className="nes-btn is-success"
            onClick={startGame}
          >
            Start
          </button>
        </span>
      )}
    </div>
  );
};

export default GameBanner;
