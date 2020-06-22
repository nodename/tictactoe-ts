// https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

import React, { createContext, useState } from 'react';
import { default_db } from './db';

export const DbContext = createContext([default_db, () => {}]);

export const DbProvider = (props: any) => {
    const [db, setDb] = useState(default_db);
    return (
        <DbContext.Provider value={[db, setDb]}>
            {props.children}
        </DbContext.Provider>
    );
};