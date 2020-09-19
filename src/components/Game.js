import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {DIMS, SQUARE_DIMS, DRAW, PLAYER_X, PLAYER_O, GAME_STATES} from "../constants";
import {getRandomInt, switchPlayers} from "../util";

const grid = new Array(DIMS ** 2).fill(null);

export default function Game() {
    const [squares, setSquares] = useState(grid);
    const [players, setPlayers] = useState({human: PLAYER_X, computer: PLAYER_O});
    const [gameState, setGameState] = useState(GAME_STATES.notStarted);
    const [nextMove, setNextMove] = useState(null);

    const move = (i, player) => {
        setSquares(squares => {
            const squaresCopy = [...squares];
            squaresCopy[i] = player;
            return squaresCopy;
        });
    };

    const humanMove = i => {
        if(!squares[i] && nextMove === players.human){
            move(i, players.human);
            setNextMove(players.computer);
        }
    };

    useEffect(() => {
        let timeout;
        if(nextMove !== null && nextMove === players.computer && gameState !== GAME_STATES.over){
            timeout = setTimeout(() => {
                computerMove();
            }, 500);
        }
        return timeout && clearTimeout(timeout);
    }, [nextMove, computerMove, players.computer, gameState]);

    const computerMove = () => {
        let i = getRandomInt(0, 8);
        while(squares[i]){
            i = getRandomInt(0, 8);
        }
        move(i, players.computer);
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
        {squares.map((square, i) => {
            const isActive = square !== null;
            return <Square key={i} onClick={() => humanMove(i)}>
                {isActive && <Marker>{square === PLAYER_X ? "X" : "O"}</Marker>}
            </Square>
        })}
    </Container>
}

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