import CSS from 'csstype';
import { useContext } from 'react';
import { DbContext } from './DbContext';
import { DbType, getTurns } from '../model/db';
import {
    getWhoPlayed, getBoard, getComputersNextMove,
    getNextPlayer, getNextTurnIndex, getSqContent,
    Row, Col, Coords, printBoard
} from '../model/board';
import { Player, getOpponent } from '../model/player';
import React, { MouseEventHandler } from 'react';
import { mergeObjects } from '../fp';

const fillStyles: CSS.Properties = {
    width: "100%",
    height: "100%"
};

const displayNone: CSS.Properties = {
    display: "none"
};

const boardStyles: CSS.Properties = {
    width: "200px",
    height: "200px",
    margin: "0 auto",
    borderCollapse: "collapse"
};

const pseudos: { [P in CSS.SimplePseudos]?: CSS.Properties } = {
    ':after': {
        content: "",
        display: "block",
        marginTop: "100%"
    },
};

const boardSqStyles0: CSS.Properties = {
    width: "33.33%",
    height: "33.33%",
    border: "6px solid #222"
};

const boardSqStyles: CSS.Properties = {
    ...boardSqStyles0, ...pseudos
};

const topSqStyles: CSS.Properties = {
    borderTopColor: "transparent"
};

const rightSqStyles: CSS.Properties = {
    borderRightColor: "transparent"
};

const bottomSqStyles: CSS.Properties = {
    borderBottomColor: "transparent"
};

const leftSqStyles: CSS.Properties = {
    borderLeftColor: "transparent"
};

const pulsate = {
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
};

const pulsateStyles: any = {
    animationName: pulsate,
    animationDuration: "1s",
    animationIterationCount: 5
};

const sqTextStyles: CSS.Properties = {
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "100%"
};

interface SqProps { row: Row, col: Col, classes: any, userPlayer: Player };

function Sq(props: SqProps) {
    const [ db, playSquare ] = useContext(DbContext);
    const { row, col, classes, userPlayer } = props;
    const style = mergeObjects(classes, pulsateStyles, sqTextStyles);

    const turns = getTurns(db as DbType);
    const board = getBoard(turns);
    const isThisSqEmpty = getWhoPlayed(board, [row, col]) === null;
    const nextTurnIndex = getNextTurnIndex(turns, board);
    const itsUsersTurn = getNextPlayer(nextTurnIndex) === userPlayer;
    let handler: (MouseEventHandler<Element>) | undefined;
    if (itsUsersTurn && isThisSqEmpty) {
        handler = playSquare([row, col]);
    } else {
        handler = undefined;
    }
    const content = getSqContent(board, [row, col]);
    return (
        <td style={style}
            id={`sq_${row}_${col}`}
            onClick={handler}>
            {content}
        </td>
    );
}

interface ComputerProps { computerPlayer: Player };

function Computer(props: ComputerProps) {
    const { computerPlayer } = props;
    const [ db, playSquare ] = useContext(DbContext);
    const turns = getTurns(db as DbType);
    const board = getBoard(turns);
    const nextTurnIndex = getNextTurnIndex(turns, board);
    const nextPlayer = getNextPlayer(nextTurnIndex);
    const computersNextMove = getComputersNextMove(board, nextPlayer) as Coords;
    const itsComputersTurn: boolean = nextPlayer === computerPlayer;
    if (itsComputersTurn) {
        setTimeout(playSquare(computersNextMove), 2000);
    }
    return (
        <div style={displayNone}>
            {`${printBoard(board)}`}
        </div>
    );
}

interface DisplayProps { userPlayer: Player };

export function Display(props: DisplayProps) {
    const { userPlayer } = props;
    const computerPlayer = getOpponent(userPlayer);

    return (
        <div style={fillStyles}>
            <Computer computerPlayer={computerPlayer} />
            <table style={boardStyles}>
                <tbody style={fillStyles}>
                    <tr>
                        <Sq classes={[boardSqStyles, topSqStyles, leftSqStyles]}
                            row={0}
                            col={0}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles, topSqStyles]}
                            row={0}
                            col={1}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles, topSqStyles, rightSqStyles]}
                            row={0}
                            col={2}
                            userPlayer={userPlayer} />
                    </tr>
                    <tr>
                        <Sq classes={[boardSqStyles, leftSqStyles]}
                            row={1}
                            col={0}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles]}
                            row={1}
                            col={1}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles, rightSqStyles]}
                            row={1}
                            col={2}
                            userPlayer={userPlayer} />
                    </tr>
                    <tr>
                        <Sq classes={[boardSqStyles, bottomSqStyles, leftSqStyles]}
                            row={2}
                            col={0}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles, bottomSqStyles]}
                            row={2}
                            col={1}
                            userPlayer={userPlayer} />
                        <Sq classes={[boardSqStyles, bottomSqStyles, rightSqStyles]}
                            row={2}
                            col={2}
                            userPlayer={userPlayer} />
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
