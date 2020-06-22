// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import React, { createContext, useState } from 'react';
import { default_db } from './db';

const setDb = (() => { }) as any;
// These are dummy parameters, which will be replaced by the DbProvider below:
export const DbContext = createContext([default_db, setDb]);

export const DbProvider = (props: any) => {
    const [db, setDb] = useState(default_db);
    return (
        <DbContext.Provider value={[db, setDb]}>
            {props.children}
        </DbContext.Provider>
    );
};