import { range } from "../fp";

const allSquaresGen = function* () {
    for (const row of range(0, 3)) {
        for (const col of range(0, 3)) {
            yield [row, col];
        }
    }
}

export const allSquares = [...allSquaresGen()];
