export const threadLast = (thing: any, ...fnAndArgs: any) => {
    let currentThing = thing;
    for (let spec of fnAndArgs) {
        let f = spec[0];
        let fArgs = [...spec.slice(1), currentThing];
        currentThing = f.apply(null, fArgs);
    }
    return currentThing;
};