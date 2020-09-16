import React, { useEffect } from 'react';
import { useStateValue } from '../context/StateProvider';
import './Timer.css';

const Timer = () => {
  const [{ isGameOver, isGameActive, timeElapsed }, dispatch] = useStateValue();

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = timeElapsed + 1;
        dispatch({ type: 'SET_TIMER', time: newTime });
      }, 1000);
    }
    if (!isGameOver & isGameActive) incrementTime();
  }, [timeElapsed, isGameOver, isGameActive, dispatch]);

  return (
    <div className="timer">
      <span role="img" aria-label="clock">
        ⏰
      </span>
      : {timeElapsed}
    </div>
  );
};

export default Timer;
