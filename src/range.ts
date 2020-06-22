export const range = function* (start = 0, end = Infinity, step = 1) {
    if (arguments.length === 1) { // a single arg should be taken as end, not start
        end = start;
        start = 0;
    }
    let value = start;
    while (value < end) {
        yield value;
        value += step;
    }
};