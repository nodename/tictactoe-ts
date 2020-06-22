import { map, reduce, isEvery, some_q, strcat } from "../fp";
import { Player, getOpponent, stringRep } from "./player";
import { minimax } from '../minimax';

const colGen = (col: number) => map((row: number) => [row, col], [0, 1, 2]);

const cols = map(colGen, [0, 1, 2]);

const rowGen = (row: number) => map((col: number) => [row, col], [0, 1, 2]);

const rows = map(rowGen, [0, 1, 2]);

const diags = [
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

const allLines = [...cols, ...rows, ...diags];

type SqContent = Player | null;
export type Board = SqContent[][];

export type Row = 0 | 1 | 2;
export type Col = 0 | 1 | 2;
export type Coords = [Row, Col];
export type Turn = { id: number, sq: Coords };

export const startingBoard: Board =
    [[null, null, null],
    [null, null, null],
    [null, null, null]];

export const sqContents = (board: Board, [row, col]: Coords) => {
    return board[row][col];
};

export function getIsFull(board: Board): boolean {
    return isEvery(
        (line: Player[]) =>
            isEvery(some_q, line),
        board);
}

const lineContents =
    (board: Board, line: Player[]) => map((coords: Coords) => sqContents(board, coords), line);

const getLineWinner = (board: Board, line: Player[]) => {
    const contents = lineContents(board, line);
    let lineWinner: Player | null;
    if (isEvery(Player.X, contents)) {
        lineWinner = Player.X;
    } else if (isEvery(Player.O, contents)) {
        lineWinner = Player.O;
    } else {
        lineWinner = null;
    }
    return lineWinner;
};

export const getWinner = (board: Board) => {
    for (const line of allLines) {
        const lineWinner = getLineWinner(board, line);
        if (lineWinner !== null) {
            return lineWinner;
        }
    }
    return null;
};

const clone = (board: Board): Board => {
    return [[...board[0]], [...board[1]], [...board[2]]];
};


export const applyTurn = (board: Board, player: Player, coords: Coords): Board => {
    const newBoard = clone(board);
    const [row, col] = coords;
    newBoard[row][col] = player;
    return newBoard;
};

function turnsReducer(aPlayer: Player) {
    let player = getOpponent(aPlayer);
    return function (board: Board, turn: Coords) {
        player = getOpponent(player);
        return applyTurn(board, player, turn);
    };
}

export function applyTurns(board: Board, nextPlayer: Player, turns: Coords[] | null): Board {
    if (turns === null) {
        return board;
    } else {
        return reduce(turnsReducer(nextPlayer), board, turns);
    }
}

export function printBoard(board: Board) {
    function printRow(rowIndex: Row) {
        const row: (Player | null)[] = board[rowIndex];
        return `${strcat(...map(stringRep, row), ' ')}`;
    }
    return `[ ${strcat(...map(printRow, [0, 1, 2]))} ]`;
}

export function getBoard(turns: Coords[]): Board {
    return applyTurns(startingBoard, Player.X, turns);
}

export function getIsTied(board: Board): boolean {
    const winner = getWinner(board);
    return getIsFull(board) && winner === null;
}

export function getIsGameOver(board: Board): boolean {
    const winner = getWinner(board);
    const tied: boolean = getIsTied(board);
    return winner !== null || tied;
}

export function getWhoPlayed(board: Board, sq: Coords): Player | null {
    return sqContents(board, sq);
}

export function getNextTurnIndex(turns: Coords[], board: Board): number | null {
    return getIsGameOver(board) ? null : turns.length;
}

export function getNextPlayer(nextTurnIndex: number | null): Player | null {
    const value =
        (nextTurnIndex === null) ? null
            : (nextTurnIndex % 2 === 0) ? Player.X
                : Player.O;
    return value;
}

export function getComputersNextMove(board: Board, nextPlayer: Player | null): Coords | null {
    return nextPlayer === null
        ? null
        : minimax(board, nextPlayer).move;
}

export function getSqContent(board: Board, sq: Coords): string {
    const player = getWhoPlayed(board, sq);
    return player === null ? ' ' : player;
}
