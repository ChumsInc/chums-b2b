import {useEffect, useRef, useState} from 'react';
import {updateLocalAuth} from "@/ducks/user/actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectLoggedIn, selectLoginExpiry} from "@/ducks/user/userProfileSlice.ts";

const oneMinute = 60 * 1000;
const fiveMinutes = 5 * oneMinute;

function useExpiresIn(expiry: number) {
    const [expiresIn, setExpiresIn] = useState(0);
    const timer = useRef(0);
    useEffect(() => {
        timer.current = window.setInterval(() => {
            const _expiresIn = (expiry * 1000) - new Date().valueOf();
            setExpiresIn(_expiresIn);
        }, oneMinute);
        return () => {
            window.clearInterval(timer.current);
        }
    }, [expiry])
    return expiresIn
}

export default function AppUpdateLocalLogin() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const expires = useAppSelector(selectLoginExpiry);
    const expiresIn = useExpiresIn(expires);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        if (isLoggedIn && expiresIn < fiveMinutes && expiresIn > 0) {
            dispatch(updateLocalAuth())
        }
    }, [dispatch, isLoggedIn, expiresIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="login-container" style={{display: 'none'}} data-expires-in={expiresIn}/>
    )
}
