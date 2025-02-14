import React from "react";
import {Colors} from "../App";
import "./GameBoard.css";

export default function GameBoard({ handleSquareSelect, board, layerBoard, checkLayerBoard }) {
  console.log(board)
    return (
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => handleSquareSelect(rowIndex, colIndex)}
                    style={{
                      "background":checkLayerBoard[rowIndex][colIndex] === 0 
                      ? Colors[layerBoard[rowIndex][colIndex]] : "red",
                      "border": checkLayerBoard[rowIndex][colIndex] === 1 ? "2px dashed white" : "none",
                      "opacity": checkLayerBoard[rowIndex][colIndex] === 1 ? 0.6 : 1,
                    
                    }}
                  >
                    <div className="game-board-cell">
                      <div className="grid-cell-layer-1">
                        {col}
                      </div>
                      
                      <div className="grid-cell-layer-2"
                      style={{
                        "bottom": col?.type == "img" ? "-4px" : "-42px",
                      }}>
                      {checkLayerBoard[rowIndex][colIndex] === 1 ? "/" : " " } 
                      </div>
                    </div>
                    
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }

