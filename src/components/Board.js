import React, { Component } from 'react';
import {DRAW, DIMS} from "../constants";

export default class Board extends Component {
    constructor(squares){
        super(squares);
        this.squares = squares || new Array(DIMS ** 2).fill(null)
    }

    getEmptySquares = (squares = this.squares) => {
        const grid = [];
        squares.map((square, i) => {
            if(!square){
                grid.push(i);
            }
        });
        return grid;
    }

    isEmpty = (squares = this.squares) => {
        return this.getEmptySquares(squares).length === DIMS ** 2;
    }

    getWinner = (squares = this.squares) => {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        let res;
        winningCombos.forEach((el, i) => {
            if(squares[el[0]] && squares[el[0]] === squares[el[1]] && squares[el[0]] === squares[el[2]]){
                res = squares[el[0]];
            } else if(!res && !this.getEmptySquares(squares).length){
                res = DRAW;
            }
        });
        return res;
    }

    getClone = () => {
        return new Board([...this.squares]);
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
