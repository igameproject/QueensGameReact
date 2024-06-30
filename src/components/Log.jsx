import React from 'react'

export default function Log({turns}) {
  return (
    <ol id="log">
        {turns.map((turn, turnIndex) => {
              const {square, playerSymbol} = turn
              const {row, col} = square
            return (
                <li key={`${row}-${col}-${playerSymbol}`}>
                    {playerSymbol} played {row} , {col}
                </li>
            )
        })}
    </ol>
  )
}
