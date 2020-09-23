import React, {useState, useEffect, useCallback} from 'react';
import styled from "styled-components";
import {DIMS, SQUARE_DIMS, DRAW, PLAYER_X, PLAYER_O, GAME_STATES} from "../constants";
import {getRandomInt, switchPlayers} from "../util";
import Board from "./Board";

const grid = new Array(DIMS ** 2).fill(null);
const board = new Board();

export default function Game() {
    const [squares, setSquares] = useState(grid);
    const [players, setPLayers] = useState({human: null, computer: null});
    const [gameState, setGameState] = useState(GAME_STATES.notStarted);
    const [nextMove, setNextMove] = useState(null);
    const [winner, setWinner] = useState(null);

    const move = useCallback((i, player) => {
        if(player && gameState === GAME_STATES.inProgress){
            setSquares(squares => {
                const squaresCopy = [...squares];
                squaresCopy[i] = player;
                return squaresCopy;
            });
        }
    }, [gameState]);

    const humanMove = i => {
        if(!squares[i] && nextMove === players.human){
            move(i, players.human);
            setNextMove(players.computer);
        }
    };

    const computerMove = useCallback(() => {
        let i = getRandomInt(0, 8);
        while(squares[i]){//it causes an infinite loop
            i = getRandomInt(0, 8);
        }
        move(i, players.computer);
    }, [squares, move, players]);

    const choosePlayer = option => {
        setPLayers({human: option, computer: switchPlayers(option)});
        setGameState(GAME_STATES.inProgress);
        //setting the human player to make the first move
        // setNextMove(players.human);
        setNextMove(PLAYER_X);
    };

    const startNewGame = () => {
        setGameState(GAME_STATES.notStarted);
        setSquares(grid);
    };
    
    useEffect(() => {
        let timeout;
        if(nextMove !== null && nextMove === players.computer && gameState !== GAME_STATES.over){
            //some delay to make computer move look more natural
            timeout = setTimeout(() => {computerMove()}, 500);
        }
        return () => timeout && clearTimeout(timeout);
    }, [nextMove, computerMove, players.computer, gameState]);

    useEffect(() => {
        const winner = board.getWinner(squares);
        const declareWinner = winner => {
            let winnerStr;
            switch(winner){
                case PLAYER_X: 
                    winnerStr = "Player X wins!";
                    break;
                case PLAYER_O:
                    winnerStr = "Player O wins!";
                    break;
                case DRAW:
                    default: winnerStr = "It's a draw!";
            }
            setGameState(GAME_STATES.over);
            setWinner(winnerStr);
        }
        if(winner && gameState !== GAME_STATES.over) declareWinner(winner);
    }, [squares, nextMove, gameState]);

    switch(gameState){
        case GAME_STATES.notStarted: 
        default: 
        return <Screen>
        <Inner>
            <ChooseText>choose your player</ChooseText>
            <ButtonRow>
                <button onClick={() => choosePlayer(PLAYER_X)}>X</button>
                <p>or</p>
                <button onClick={() => choosePlayer(PLAYER_O)}>O</button>
            </ButtonRow>
        </Inner>
    </Screen>;
        case GAME_STATES.inProgress:
        return <Container dims={DIMS}>
        {squares.map((square, i) => {
            const isActive = square !== null;
            return <Square key={i} onClick={() => humanMove(i)}>
                {isActive && <Marker>{square === PLAYER_X ? "X" : "O"}</Marker>}
            </Square>
        })}
    </Container>;
    case GAME_STATES.over:
        return (
            <div>
                <p>{winner}</p>
                <button onClick={startNewGame}>start over</button>
            </div>
        );
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