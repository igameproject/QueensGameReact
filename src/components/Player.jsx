import React from 'react';
import { useState } from "react"

const Player = ({initialName, symbol, isActive, handlePlayerNameChange}) => {
    const [ name, setName ] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);
    function handleEditClick(){ 
        setIsEditing((editing) => !editing)
        if(isEditing){
          handlePlayerNameChange(symbol, name)
        }
    }
    function changeName(e){
      setName(e.target.value)
    }
    
    let playerName =  <span className="player-name">{name}</span>
    if(isEditing){
        playerName = <input type="text" value={name} onChange={changeName} /> 
    }
    return (
        <li className={isActive ? "active" : undefined}>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
            <button onClick={() => handleEditClick()}>{isEditing ? "Save" : "Edit"}</button>
          </span>

        </li>
    );
}

export default Player;
