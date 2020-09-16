import React from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import GameBanner from './components/GameBanner';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <h1>Minesweeper</h1>
      <Header />
      <GameBoard />
      <GameBanner />
    </div>
  );
}

export default App;
