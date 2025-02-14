import React from "react";

export default function Intructions() {
  return (
    <div>
      <h1>Instructions</h1>
      <ul>
      <li>
        Your goal is to have exactly one Queen in each row, column, and color region.
      </li>

      <li>
        Tap once to place X and tap twice for Queen. Use X to mark where Queen cannot
        be placed.
      </li>

      <li>Two Queens cannot touch each other, not even diagonally.</li>
      <li>Each row can only have one Queen</li>
      <li>Each column can only have one Queen</li>
      <li>Each region can only have one Queen</li>
      <li>Two Queens cannot touch each other</li>
      </ul>
     
    </div>
  );
}
