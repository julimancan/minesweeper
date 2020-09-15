import React, { createContext, useContext, useReducer } from 'react';
import { boardSetup } from '../helpers/boardSetup';

export const initialState = {
  rows: 16,
  cols: 16,
  length: 30,
  totalBombs: 10,
  gridArray: []
};

export const StateContext = createContext();

export const StateProvider = ({ reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, boardSetup);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
