import React, {useState} from 'react';
import styled from "styled-components";
import {DIMS, SQUARE_DIMS, DRAW, PLAYER_X, PLAYER_O, GAME_STATES} from "../constants";
import {getRandomInt, switchPlayers} from "../util";

const grid = new Array(DIMS ** 2).fill(null);

export default function Game() {
    const [squares, setSquares] = useState(grid);
    const [players, setPlayers] = useState({human: null, computer: null});
    const [gameState, setGameState] = useState(GAME_STATES.notStarted);

    const move = (idx, player) => {
        setSquares(squares => {
            const squaresCopy = [...squares];
            squaresCopy[idx] = player;
            return squaresCopy;
        });
    };

    const humanMove = idx => {
        if(!squares[idx]){
            move(idx, players.human);
        }
    };

   const computerMove = () => {
       const idx = getRandomInt(0, 8);
       while(squares[idx]){
           idx = getRandomInt(0, 8);
       }
       move(idx, players.computer);
   };

   const choosePlayer = option => {
       setPlayers({human: option, computer: switchPlayers(option)});
       setGameState(GAME_STATES.inProgress);
   };

    return gameState === GAME_STATES.notStarted ? <Screen>
        <Inner>
            <ChooseText>choose your player</ChooseText>
            <ButtonRow>
                <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
                <p>or</p>
                <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
            </ButtonRow>
        </Inner>
    </Screen> : <Container dims={DIMS}>
            {squares.map((el, idx) => {
                const isActive = el !== null;
                return <Square key={idx} onClick={() => humanMove(idx)}>
                    {isActive && <Marker>{el === PLAYER_X ? "X" : "O"}</Marker>}
                </Square>
            })}
    </Container>
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    width: ${({dims}) => `${dims * (SQUARE_DIMS + 5)}px`};
    flex-flow: wrap;
    position: relative;
`;

const Square = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${SQUARE_DIMS}px;
    height: ${SQUARE_DIMS}px;
    border: 1px solid black;
    &:hover{
        cursor: pointer;
    }
`;

const Marker = styled.p`
    font-size: 68px;
`;

const Screen = styled.div``;

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
`;

const ChooseText = styled.p``;

const ButtonRow = styled.div`
    display: flex;
    width: 150px;
    justify-content: space-between;
`;