import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import './Timer.css';

const Timer = () => {
  let [timeElapsed, setTimeElapsed] = useState(0);
  const [{ isGameOver, isGameActive }, dispatch] = useStateValue();

  useEffect(() => {
    function incrementTime() {
      setTimeout(() => {
        let newTime = timeElapsed + 1;
        setTimeElapsed(newTime);
      }, 1000);
    }
    if (!isGameOver & isGameActive) incrementTime();
  }, [timeElapsed, isGameOver, isGameActive]);

  return (
    <span role="img" aria-label="clock">
      ⏰ : {timeElapsed}
    </span>
  );
};

export default Timer;
