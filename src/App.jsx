import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

function deriveActivePlayer(gameTurns){
  let currentPlayerSymbol = "X";

  if(gameTurns.length > 0 && gameTurns[0].playerSymbol === "X"){
    currentPlayerSymbol = "O"
  }

  return currentPlayerSymbol
}

function deriveWinner(players, currentBoard){
  let winner;

  for(const combination of WINNING_COMBINATIONS){
    let firstSquareSymbol = currentBoard[combination[0].row][combination[0].col]
    let secondSquareSymbol = currentBoard[combination[1].row][combination[1].col]
    let thirdSquareSymbol = currentBoard[combination[2].row][combination[2].col]
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol
    ){
      winner = players[firstSquareSymbol]
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  const currentBoard =  [...INITIAL_GAME_BOARD.map(arr => [...arr])];

  for(const turn of gameTurns){
    const {square, playerSymbol} = turn
    const {row, col} = square
    currentBoard[row][col] = playerSymbol
  }

  return currentBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS
  )

  const currentBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(players, currentBoard)

  let isDraw = false; 

  if(gameTurns.length === 9 && !winner){
    isDraw = true
  }

  const currentPlayerSymbol = deriveActivePlayer(gameTurns);


  function handleSquareSelect(rowIndex, colIndex){
    setGameTurns(prevTurns => {
      const currentPlayerSymbol = deriveActivePlayer(prevTurns)
      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, playerSymbol: currentPlayerSymbol}, 
        ...prevTurns
      ]
      return updatedTurns;
    })
  }

  function resetGame(){
    setGameTurns([])
  }

  function handlePlayerNameChange(sym, name){
    setPlayers(prevNames => {
      return {
        ...prevNames,
        [sym]: name 
      }
    }
      
    );
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={currentPlayerSymbol === "X"} handlePlayerNameChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O}  symbol="O" isActive={currentPlayerSymbol === "O"} handlePlayerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner || isDraw )  && <GameOver winner={winner} resetGame={resetGame} />}
        <GameBoard handleSquareSelect={handleSquareSelect} board={currentBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
