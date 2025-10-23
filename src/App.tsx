
import { useEffect, useRef } from "react";
import GameBoard from "./components/GameBoard";
import Instructions from "./components/Instructions";
// import Log from "./components/Log";
// import GameOver from "./components/GameOver";
import { useState } from "react";
import queenImage from "./public/queen.png"; 

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
  const [queenList, setQueenList] = useState<number[][]>([]);
  const rowRef = useRef(null)
  const colRef = useRef(null)

  useEffect(() => {
   const [row, col] = [rowRef.current, colRef.current]
    if(row === null || col === null){
     return
    }
    markRowCol(row, col, !checkRowIsValid(row), !checkColIsValid(col))
    if(!checkNeighbours(row, col)){
      alert("Queens too near")
    }
    console.log(queenList)
  }, [currentBoard]);

  
  function handleSquareSelect(row, col){
    let newBoard = currentBoard.map(arr => [...arr]);

    if(currentBoard[row][col]=== null){
      newBoard[row][col] = <img src={queenImage} alt="queen image" height={60} width={60} />;
      setCurrentBoard(newBoard);
      setQueenList([...queenList, [row, col]]);
    }
    else {
      newBoard[row][col] = null;
      setCurrentBoard(newBoard);
      for(let i=0; i<queenList.length; i++){
        if(queenList[i][0] === row && queenList[i][1] === col){
          setQueenList(queenList.filter((_, index) => index !== i));
          break;
        }
      }
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

  function checkNeighbours(row: int, col: int){
    // only on corners
    if (row === 0 && col === 0){
      return (currentBoard[row + 1][col] === null 
        && currentBoard[row + 1][col + 1 ] === null 
        && currentBoard[row][col + 1 ] === null)
    }
    if (row === 0 && col === currentBoard[0].length - 1){
      return (currentBoard[row ][col - 1] === null 
        && currentBoard[row + 1][col - 1 ] === null 
        && currentBoard[row + 1][col] === null)
    }

    if (col === 0 && row === currentBoard.length - 1){
      return (currentBoard[row - 1][col] === null 
        && currentBoard[row - 1][col + 1 ] === null 
        && currentBoard[row][col + 1] === null)
    }

    if (col === currentBoard[0].length - 1 && row === currentBoard.length - 1){
      return (currentBoard[row ][col - 1] === null 
        && currentBoard[row - 1][col - 1 ] === null 
        && currentBoard[row - 1][col] === null)
    }

    // only on sides
    debugger
    if (row === 0){
      return (currentBoard[row][col + 1] === null && 
        currentBoard[row + 1][col + 1 ] === null && 
        currentBoard[row + 1][col] === null && 
        currentBoard[row + 1][col - 1] === null && 
        currentBoard[row][col - 1] === null)
    }
    if (col === 0){
      return (currentBoard[row + 1][col] === null && 
        currentBoard[row + 1][col + 1 ] === null && 
        currentBoard[row][col + 1 ] === null && 
        currentBoard[row - 1][col + 1] === null && 
        currentBoard[row - 1][col] === null)
    }

    if (row === currentBoard.length - 1){
      return (currentBoard[row][col + 1] === null && 
        currentBoard[row - 1][col + 1 ] === null && 
        currentBoard[row - 1][col] === null && 
        currentBoard[row - 1][col - 1] === null && 
        currentBoard[row][col - 1] === null)
    }
    if (col === currentBoard[0].length - 1){
      return (currentBoard[row + 1][col] === null && 
        currentBoard[row + 1][col - 1 ] === null && 
        currentBoard[row][col - 1] === null && 
        currentBoard[row - 1][col - 1] === null && 
        currentBoard[row - 1][col] === null)
    }

    return (currentBoard[row + 1][col + 1 ] === null && 
    currentBoard[row][col + 1 ] === null && 
    currentBoard[row - 1][col + 1] === null && 
    currentBoard[row - 1][col ] === null &&
    currentBoard[row + 1][col - 1] === null && 
    currentBoard[row][col - 1] === null &&
    currentBoard[row - 1][col - 1] === null && 
    currentBoard[row + 1][col] === null)

  }

  function checkQueenInLayer(row: int, col: int){
    for (let i = 0; i < currentBoard.length; i++) {
     
    }
  }


  // if there is a queen in neighbouring squares, get its position and 
  // turn both current queen and neighbouring queen to red queen 
  // 

  

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
