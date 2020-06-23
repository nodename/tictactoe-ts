import React, { useContext } from 'react';
import { some_q } from '../fp';
import { DbContext } from './DbContext';
import { DbType, getTurns } from '../model/db';
import {
    getBoard, getNextPlayer, getNextTurnIndex,
    getIsGameOver, getIsTied, getWinner
} from '../model/board';
import CSS from 'csstype';

const gameMessageStyles: CSS.Properties = {
    width: "200px",
    height: "50px",
    margin: "0 auto",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "50px"
}

export const Message1 = () => {
    const [db] = useContext(DbContext);
    const turns = getTurns(db as DbType);
    const board = getBoard(turns);
    const turn = getNextTurnIndex(turns, board);
    const player = getNextPlayer(turn);
    const gameOver = getIsGameOver(board);
    const message1 = gameOver ? "GAME OVER" : `turn ${turn} player ${player}`;
    return (
        <div style={gameMessageStyles}>
            {message1}
        </div>
    );
};
 
export const Message2 = () => {
    const [db] = useContext(DbContext);
    const turns = getTurns(db);
    const board = getBoard(turns);
    const winner = getWinner(board);
    const tied = getIsTied(board);
    const message2 = 
         some_q(winner) ? `${winner} WINS!`
            : tied ? "TIE GAME"
                : "";
    return (
        <div style={gameMessageStyles}>
            {message2}
        </div>
    );
};