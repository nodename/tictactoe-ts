import React, { useContext } from 'react';
import { DbContext } from './DbContext';
import { printBoard, getBoard } from './board';
import { getTurns } from './db';

export const DebugComponent = () => {
    const [db] = useContext(DbContext);
    const turns = getTurns(db);
    const board = getBoard(turns);

    return (
        <div>
            <div>
                {`board: ${printBoard(board)}`}
            </div>
            <div>
                {`turns: ${turns}`}
            </div>
        </div >
    );
};