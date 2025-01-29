import GameBoard from "./components/GameBoard";
import Instructions from "./components/Instructions";
// import Log from "./components/Log";
// import GameOver from "./components/GameOver";
import { useState } from "react";
import queenImage from "./assets/queen.png";
import xImage from "./assets/x.png";


const INITIAL_GAME_BOARD = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
];


function App() {
  const [currentBoard, setCurrentBoard] = useState(INITIAL_GAME_BOARD);

  function handleSquareSelect(row, col){
    let newBoard = currentBoard.map(arr => [...arr]);
    console.log(currentBoard[row][col])
    if(currentBoard[row][col]?.props?.src === "/src/assets/x.png"){
      newBoard[row][col] = <img src={queenImage} alt="queen image" />;
      setCurrentBoard(newBoard);
    } else {
      newBoard[row][col] = <img src={xImage} alt="x image" />;
      setCurrentBoard(newBoard);
    }
  }

  return (
    <main>
        {/* {(winner || isDraw )  && <GameOver winner={winner} resetGame={resetGame} />} */}
        <div className="game-section">
          <div className="board-section">
            <GameBoard handleSquareSelect={(row,col)=>{handleSquareSelect(row, col)}} board={currentBoard} />

          </div>

          <div className="instruction-section">
            <Instructions />

          </div>
        </div>
       
    </main>
  )
}

export default App
