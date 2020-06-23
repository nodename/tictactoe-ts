// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import React, { createContext, useState } from 'react';
import { DbType, default_db } from '../model/db';

type DbContextType = [DbType, any];
const dummyDbContextValue: DbContextType = [default_db, () => { }];
export const DbContext = createContext<DbContextType>(dummyDbContextValue);

export const DbProvider = (props: any) => {
    const [db, setDb] = useState(default_db);
    return (
        <DbContext.Provider value={[db, setDb]}>
            {props.children}
        </DbContext.Provider>
    );
};