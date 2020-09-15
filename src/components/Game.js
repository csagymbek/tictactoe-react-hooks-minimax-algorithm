import React, {useState} from 'react';
import {DIMS, SQUARE_DIMS, DRAW, PLAYER_X, PLAYER_O} from "../constants";
import styled from "styled-components";

const arr = new Array(DIMS ** 2).fill(null);

export default function Game() {
    const [squares, setSquares] = useState(arr);
    const [players, setPlayers] = useState({
        human: PLAYER_X,
        computer: PLAYER_O
    });

    const move = (idx, player) => {
        setSquares(squares => {
            const squaresCopy = [...squares];
            squares[idx] = player;
            return squaresCopy;
        });
    };

    const humanMove = idx => {
        if(!squares[idx]){
            move(idx, players.human);
        }
    };

    return (
        <Container dims={DIMS}>
            {squares.map((el, idx) => {
                const isActive = el !== null;
                return (
                    <Square key={idx} onClick={() => humanMove(idx)}>
                        {isActive && <Marker>{el === PLAYER_X ? "X" : "O"}</Marker>}
                    </Square>
                );
            })}
        </Container>
    );
}


const Container = styled.div `
    display: flex;
    justify-content: center;
    width: ${({dims}) => `${dims * (SQUARE_DIMS + 5)}px`};
    flex-flow: wrap;
    position: relative;
`;

const Square = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${SQUARE_DIMS}px;
    height: ${SQUARE_DIMS}px;
    border: 1px solid black;
    border
    &:hover{
        cursor: pointer;
    }
`;

const Marker = styled.p `
    font-size: 68px;
`;

