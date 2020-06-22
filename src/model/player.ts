export enum Player {
    X = "X",
    O = "O"
}

export const getOpponent = (player: Player) => {
    if (player === Player.X) {
        return Player.O;
    } else {
        return Player.X;
    }
};
 
export const stringRep = (player: Player | null) => { 
    return player === null ? "-" : player;
};