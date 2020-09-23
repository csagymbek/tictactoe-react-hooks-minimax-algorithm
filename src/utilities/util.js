import {PLAYER_X, PLAYER_O} from "./constants";

export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const switchPlayers = player => {
    return player === PLAYER_X ? PLAYER_O : PLAYER_X;
};