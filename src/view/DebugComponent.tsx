import React, { useContext } from 'react';
import { DbContext } from './DbContext';
import { printBoard, getBoard } from '../model/board';
import { DbType, getTurns } from '../model/db';

export const DebugComponent = () => {
    const [db] = useContext(DbContext);
    const turns = getTurns(db as DbType);
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