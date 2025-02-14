import React from 'react'

export default function GameOver({resetGame}) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>You Won</p>
      <p><button onClick={resetGame}>REMATCH !</button></p>
    </div>
  )
}
