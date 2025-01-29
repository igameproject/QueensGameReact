export default function GameBoard({handleSquareSelect, board}){
 
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => (
                 <li key={rowIndex}>
                    <ol>
                        {row.map((col, colIndex) => 
                            (
                                <li key={colIndex}>
                                    <button onClick={() => handleSquareSelect(rowIndex, colIndex)} disabled={col !== null}>{col}</button>
                                </li>
                            )
                        )}
                    </ol>
                </li>
            ))}
        </ol>
    );
}