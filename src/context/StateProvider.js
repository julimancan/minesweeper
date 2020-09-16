import React, { createContext, useContext, useReducer } from 'react';
import { boardSetup } from '../helpers/boardSetup';

export const StateContext = createContext();

export const StateProvider = ({ reducer, children, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState, boardSetup);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
