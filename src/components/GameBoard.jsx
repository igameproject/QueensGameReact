import {Colors} from "../App";

export default function GameBoard({ handleSquareSelect, board, layerBoard }) {
    return (
      <ol id="game-board">
        {board.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => handleSquareSelect(rowIndex, colIndex)}
                    style={{"background": Colors[layerBoard[rowIndex][colIndex]]}}
                  >
                    {col}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    );
  }

