import { Coords } from './board';

export type DbType = { name: string, game: Coords[] };

export const default_db: DbType = {
    name: 'tictactoe',
    game: []
};

// returns new db
export const addTurn = (sq: Coords, db: any) => {
  //  console.log(`addTurn: ${sq}`);
    const turns = db['game'];
    const clone = (turns === null || turns === undefined)
        ? [sq]
        : [...turns, sq];
    return { ...db, ...{ game: clone } };
};

export function getTurns(db: DbType) {
    //console.log(`db: ${db['game']}`);
    return db['game'];
}