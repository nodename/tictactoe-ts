
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
        pred = x => x === pred;
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


// function createEventDispatcher() {
//     let obj = {
//         listeners: {},
//         addEventListener: function (name, fn) {
//             const L = this.listeners;
//             L[name] = L[name] || [];
//             L[name].push(fn);
//         },
//         removeEventListener: function (name, fn) {
//             const L = this.listeners;
//             var a = L[name];
//             remove(x => x === fn, a);
//         },
//         dispatchEvent: function (name, ...args) {
//             const L = this.listeners;
//             var l = L[name];
//             if (l) {
//                 for (const val of l) {
//                     val.apply(val, args);
//                 }
//             }
//         }
//     };
//     return obj;
// }