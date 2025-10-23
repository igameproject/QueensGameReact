import React from 'react'

interface GameOverProps {
  resetGame: () => void;
}
export default function GameOver({resetGame}: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>You Won</p>
      <p><button onClick={resetGame}>REMATCH !</button></p>
    </div>
  )
}
