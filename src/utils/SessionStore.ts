export default class SessionStore {
    static getItem<T = unknown>(key: string, defaultValue: T): T {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return defaultValue;
        }
        const data = window.sessionStorage.getItem(key);
        if (!data) {
            return defaultValue;
        }
        try {
            return JSON.parse(data) ?? defaultValue;
        } catch (err: unknown) {
            return defaultValue;
        }
    }

    static setItem<T = unknown>(key: string, data: T) {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.setItem(key, JSON.stringify(data));
    }

    static removeItem(key: string) {
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return;
        }
        window.sessionStorage.removeItem(key);
    }
}
