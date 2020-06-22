import { allSquares } from "./model/allSquares";
import { getOpponent, Player } from "./model/player";
import { Board, Coords, sqContents, getWinner, applyTurn, printBoard } from "./model/board";
import { filter, isEmpty } from "./fp";

const minimax0 = (board: Board, player: Player): { move: Coords | null, score: number } => {
    const winner = getWinner(board);
    if (winner === player) {
        return { move: null, score: 1 };
    }
    if (winner === getOpponent(player)) {
        return { move: null, score: -1 };
    }
    let emptySquares = filter((sq: Coords) => sqContents(board, sq) === null, allSquares);
    if (isEmpty(emptySquares)) { // tie game
        return { move: null, score: 0 };
    }

    let value = { move: null, score: -2 };
    for (const sq of emptySquares) {
        const boardWithNewMove: Board = applyTurn(board, player, sq);
        const mm = minimax(boardWithNewMove, getOpponent(player));
        const scoreForTheMove = - mm.score;
        if (scoreForTheMove > value.score) {
            value = { move: sq, score: scoreForTheMove };
        }
    }
    if (value.move === null) {
        return { move: null, score: 0 };
    } else {
        return value;
    }
};

const memoized = () => {
    let cache: Map<string, any> = new Map();

    return function (board: Board, player: Player) {
        const key: string = printBoard(board) + player;
        if (cache.has(key)) {
            return cache.get(key);
        } else {
            const result = minimax0(board, player);
            cache.set(key, result);
            return result;
        }
    }
}

export const minimax = memoized();
