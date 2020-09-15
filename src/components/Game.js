import React, {useState} from 'react'
import styled from "styled-components";
import {DIMS, SQUARE_DIMS, DRAW, PLAYER_X, PLAYER_O} from "../constants";

export default function Game() {
    const [squares, setSquares] = useState(new Array(DIMS ** 2).fill(null));
    const [players, setPlayers] = useState({
        human: PLAYER_X,
        computer: PLAYER_O
    });

    const move = (index, player) => {
        setSquares(squares => {
            const squaresCopy = [...squares];
            squaresCopy[index] = player;
            return squaresCopy;
        });
    }

    const humanMove = index => {
        if(!squares[index]){
            move(index, players.human);
        }
    }

    

    return (
        <div>
            
        </div>
    )
}
