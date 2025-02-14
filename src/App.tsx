
import React from "react";
import GameBoard from "./components/GameBoard";
import Instructions from "./components/Instructions";
// import Log from "./components/Log";
// import GameOver from "./components/GameOver";
import { useState } from "react";
import queenImage from "./assets/queen.png";
// import xImage from "./assets/x.png";

export const Colors = [
  "#A3D2D8", 
  "#FE7A60",
  "#96BEFF",
  "#FFC992",
  "#B3DFA0"
]

const INITIAL_GAME_BOARD: (null|Element)[][] = [
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

const CHECK_LAYER_BOARD = [
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
];




function App() {
  const [currentBoard, setCurrentBoard] = useState(INITIAL_GAME_BOARD);

  function handleSquareSelect(row, col){
    let newBoard = currentBoard.map(arr => [...arr]);
    // if(currentBoard[row][col]?.props?.src === "/src/assets/x.png"){
    //   newBoard[row][col] = <img src={queenImage} alt="queen image" />;
    //   setCurrentBoard(newBoard);
    // } else {
    //   newBoard[row][col] = <img src={xImage} alt="x image" />;
    //   setCurrentBoard(newBoard);
    // }

    if(currentBoard[row][col]=== null){
      newBoard[row][col] = <img src={queenImage} alt="queen image" height={60} width={60}/>;
      setCurrentBoard(newBoard);
    }
    else {
      newBoard[row][col] = null;
      setCurrentBoard(newBoard);
    }
  }

  function checkRowIsValid(): boolean{
    return false
  }

  function checkColIsValid(): boolean{
    return false
    
  }

  function checkRegionIsValid(): boolean{return false}


  function checkBoard(){
    const rowHasOneQueen = checkRowIsValid();
    const colHasOneQueen = checkColIsValid();
    const regionHasOneQueen = checkRegionIsValid();
    if(!rowHasOneQueen){
      //highlight given row with red color
    }
    if(!colHasOneQueen){
      //highlight given column with red color
    }
    if(!regionHasOneQueen){
      //highlight given region with red color
    }
  }

  return (
    <main>
        {/* {(winner || isDraw )  && <GameOver winner={winner} resetGame={resetGame} />} */}
        <div className="game-section">
          <div className="board-section">
              <GameBoard handleSquareSelect={(row,col)=>{handleSquareSelect(row, col)}} board={currentBoard} layerBoard={LAYER_BOARD} checkLayerBoard={CHECK_LAYER_BOARD} />
          </div>

          <div className="instruction-section">
            <Instructions  />

          </div>
        </div>
       
    </main>
  )
}

export default App
