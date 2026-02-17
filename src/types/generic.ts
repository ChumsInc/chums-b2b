export default class B2BError extends Error {
    url?: string;
    debug?: unknown;
    code?: string | number;

    constructor(message: string, url?: string, debug?: unknown, code?: string | number) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.debug = debug;
        this.url = url;
        this.code = code;
    }
}

export interface SortProps<T = KeyedObject> {
    field: keyof T;
    ascending: boolean;
}


export interface Appendable {
    newLine?: boolean;
}


export type LoadStatus = 'pending' | 'rejected' | 'idle';
export type OrderActionStatus = LoadStatus | 'saving' | 'promoting' | 'deleting';

export interface KeyedObject<T = unknown> {
    [key:string]: T
}

export interface APIErrorResponse {
    error?: string;
    name?: string;
}
