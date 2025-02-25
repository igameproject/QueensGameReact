
import React, { useEffect, useRef } from "react";
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

const INITIAL_GAME_BOARD: (any)[][] = [
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
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
];


function App() {
  const [currentBoard, setCurrentBoard] = useState(INITIAL_GAME_BOARD);
  const [checkLayerBoard, setCheckLayerBoard] = useState(CHECK_LAYER_BOARD);
  const rowRef = useRef(null)
  const colRef = useRef(null)

  useEffect(() => {
   const [row, col] = [rowRef.current, colRef.current]
    if(row === null || col === null){
     return
    }
    markRowCol(row, col, !checkRowIsValid(row), !checkColIsValid(col))
  }, [currentBoard]);

  function handleSquareSelect(row, col){
    let newBoard = currentBoard.map(arr => [...arr]);

    if(currentBoard[row][col]=== null){
      newBoard[row][col] = <img src={queenImage} alt="queen image" height={60} width={60} />;
      setCurrentBoard(newBoard);
    }
    else {
      newBoard[row][col] = null;
      setCurrentBoard(newBoard);
    }

    rowRef.current = row;
    colRef.current = col;
  }

  function markRowCol(row: int, col: int, rowInvalid: bool, colInvalid: bool){
    let newboard = checkLayerBoard.map(arr => [...arr]);
    for (let i = 0; i < newboard[row].length; i++) {
      // if invalid set all row values to 1
      if(rowInvalid){
        newboard[row][i]= 1;
      } else {
        // if( newboard[i][col] !== 1){
          // apply optimization here
          newboard[row][i] = !checkColIsValid(i) ? 1 : 0;
         
      }
    } 

    for (let i = 0; i < newboard.length; i++) {
      // if invalid set all column values to 1
      if(colInvalid){
        newboard[i][col] = 1;
      } else {
        // do nothing if the value is already 1
          newboard[i][col] = !checkRowIsValid(i) ? 1 : 0;
      }
    } 
    setCheckLayerBoard(newboard);
  }


  function checkRowIsValid(row: int){
    // checks all element in row and makes sure no two queens are in the same row
    let queenCount = 0
    for (let i = 0; i < currentBoard[row].length; i++) {
      if(currentBoard[row][i] !== null){
        queenCount += 1;
        if(queenCount > 1){
          return false
        }
      }
    }
    return true
  }

  function checkColIsValid(col: int){
    // checks all element in row and makes sure no two queens are in the same row
    let queenCount = 0
    for (let i = 0; i < currentBoard.length; i++) {
      if(currentBoard[i][col] !== null){
        queenCount += 1;
      }
      if(queenCount > 1){
        return false
      }
    }
    return true
  }

  // function checkColIsValid(): boolean{
  //   return false
    
  // }

  // function checkRegionIsValid(): boolean{return false}


  // function checkBoard(row, col){
  //   const rowHasOneQueen = checkRowIsValid(row);
  //   const colHasOneQueen = checkColIsValid();
  //   const regionHasOneQueen = checkRegionIsValid();
  //   if(!rowHasOneQueen){
  //     //highlight given row with red color
  //   }
  //   if(!colHasOneQueen){
  //     //highlight given column with red color
  //   }
  //   if(!regionHasOneQueen){
  //     //highlight given region with red color
  //   }
  // }

  return (
    <main>
        {/* {(winner || isDraw )  && <GameOver winner={winner} resetGame={resetGame} />} */}
        <div className="game-section">
          <div className="board-section">
              <GameBoard handleSquareSelect={(row,col)=>{handleSquareSelect(row, col)}} board={currentBoard} layerBoard={LAYER_BOARD} checkLayerBoard={checkLayerBoard} />
          </div>

          <div className="instruction-section">
            <Instructions  />

          </div>
        </div>
       
    </main>
  )
}

export default App;
