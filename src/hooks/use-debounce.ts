import {useCallback, useEffect, useRef, useState} from 'react';

function simpleIsEqual<T = unknown>(a: T, b: T): boolean {
    return a === b;
}

export interface UseDebounceOptions<T = unknown> {
    eq?: (a: T, b: T) => boolean;
}

export function useDebounceValue<T = unknown>(
    initialValue: T,
    delay: number = 0,
    options?: UseDebounceOptions): [T, (value: T) => void]
{
    const timerHandle = useRef<number>(0);
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
    const isEqual = useCallback(options?.eq ?? simpleIsEqual, [options]);

    const setValue = useCallback((value: T) => {
        window.clearInterval(timerHandle.current);
        timerHandle.current = window.setTimeout(() => {
            if (!isEqual(value, debouncedValue)) {
                setDebouncedValue(value);
            }
        }, delay)
    }, [delay, isEqual]);

    useEffect(() => {
        return () => {
            window.clearInterval(timerHandle.current);
        }
    }, [delay]);

    return [debouncedValue, setValue];
}
