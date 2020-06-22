
export const isEmpty = (list) => list === null || list.length === 0;
const first = (list) => { 
    if (isEmpty(list)) {
        return null;
    } else {
        return list[0];
    }
};
const rest = list => {
    if (isEmpty(list)) {
        return null;
    } else {
        return list.slice(1);
    }
};

export const map = (f, list) => list === null ? null : list.map(f);
export const reduce = (f, initialValue, list) => list.reduce(f, initialValue);
export const filter = (pred, list) => list === null ? null : list.filter(pred);
export const remove = (pred, list) => list === null ? null : list.remove(pred);
export const sort = (compare, list) => list === null ? null : list.sort(compare);

export const isEvery = (pred, list) => {
    if (isEmpty(list)) {
        return true;
    };

    if (typeof pred !== 'function') {
        const val = pred;
        pred = x => x === val;
    }

    if (pred(first(list))) {
        return isEvery(pred, rest(list));
    } else {
        return false;
    }
}

// would like to call it some? but that's no good in js
export const some_q = val => val !== null;

export const mergeMaps = ({ m0, m1 }) => {
    return new Map([...m0, ...m1]);
};

// merge objects and arrays of objects
export const mergeObjects = (...objects) => {
    let merged = {};

    for (const obj of objects) {
        if (Array.isArray(obj)) {
            const arrayMerged = mergeObjects(...obj);
            merged = { ...merged, ...arrayMerged };
        } else if (typeof obj === 'object' && obj !== null) {
            merged = { ...merged, ...obj };
        } else {
            continue;
        }
    }

    return merged;
};

export const strcat = (...strings) => {
    return ''.concat(...strings);
}

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

export const threadLast = (thing, ...fnAndArgs) => {
    let currentThing = thing;
    for (let spec of fnAndArgs) {
        let f = spec[0];
        let fArgs = [...spec.slice(1), currentThing];
        currentThing = f.apply(null, fArgs);
    }
    return currentThing;
};
