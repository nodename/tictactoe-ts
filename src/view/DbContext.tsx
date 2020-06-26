// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import React, { createContext, useState } from 'react';
import { DbType, default_db, addTurn } from '../model/db';
import { Coords } from '../model/board';

const updateWithTurn = (setDb: any) => (sq: Coords) => () => setDb((db: DbType) => addTurn(sq, db));

type DbContextType = [DbType, any];
const dummyDbContextValue: DbContextType = [default_db, () => { }];
export const DbContext = createContext<DbContextType>(dummyDbContextValue);

export const DbProvider = (props: { children: any }) => {
    const [db, setDb] = useState(default_db);
    return (
        // There's only one update operation permitted on the db,
        // namely adding a turn,
        // so that's what we pass down:
        <DbContext.Provider value={[db, updateWithTurn(setDb)]}>
            {props.children}
        </DbContext.Provider>
    );
};