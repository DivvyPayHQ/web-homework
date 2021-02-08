export const isUndefined = (x: unknown): x is undefined => x === undefined;

export const isNotUndefined = (x: unknown): boolean => !isUndefined(x);

export const isBoolean = (x: unknown): x is boolean => x === true || x === false;
