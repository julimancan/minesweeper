import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Header />
      <GameBoard />
    </div>
  );
}

export default App;
