import GameBoard from "./components/GameBoard";
import Instructions from "./components/Instructions";
// import Log from "./components/Log";
// import GameOver from "./components/GameOver";
import { useState } from "react";
import queenImage from "./assets/queen.png";
import xImage from "./assets/x.png";

export const Colors = [
  "#A3D2D8", 
  "#FE7A60",
  "#96BEFF",
  "#FFC992",
  "#B3DFA0"
]

const INITIAL_GAME_BOARD = [
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
];


const LAYER_BOARD = [
  [0, 0, 1, 1, 2],
  [0, 1, 1, 2, 2],
  [0, 1, 1, 2, 2],
  [3, 3, 4, 4, 4],
  [3, 3, 3, 4, 4],
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
              <GameBoard handleSquareSelect={(row,col)=>{handleSquareSelect(row, col)}} board={currentBoard} layerBoard={LAYER_BOARD} />
          </div>

          <div className="instruction-section">
            <Instructions  />

          </div>
        </div>
       
    </main>
  )
}

export default App
