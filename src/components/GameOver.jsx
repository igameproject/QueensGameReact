import React from 'react'

export default function GameOver({winner, resetGame}) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner ? <p>{winner} won!</p> : <p>Game was a draw</p>}
      <p><button onClick={resetGame}>REMATCH !</button></p>
    </div>
  )
}
