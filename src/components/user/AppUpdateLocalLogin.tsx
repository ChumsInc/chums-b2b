import {useEffect, useRef, useState} from 'react';
import {updateLocalAuth} from "@/ducks/user/actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectLoggedIn, selectLoginExpiry} from "@/ducks/user/userProfileSlice.ts";

const oneMinute = 60 * 1000;
const fiveMinutes = 5 * oneMinute;

function useExpiresIn() {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const expiry = useAppSelector(selectLoginExpiry);
    const [expiresIn, setExpiresIn] = useState(isLoggedIn ? (expiry * 1000) - new Date().valueOf() : 0);
    const timer = useRef(0);
    useEffect(() => {
        timer.current = window.setInterval(() => {
            const _expiresIn = isLoggedIn ? (expiry * 1000) - new Date().valueOf() : 0;
            setExpiresIn(_expiresIn);
        }, oneMinute);
        return () => {
            window.clearInterval(timer.current);
        }
    }, [expiry, isLoggedIn])
    return expiresIn
}

export default function AppUpdateLocalLogin() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const expiresIn = useExpiresIn();

    useEffect(() => {
        if (expiresIn > 0 && expiresIn < fiveMinutes) {
            dispatch(updateLocalAuth())
        }
    }, [dispatch, expiresIn]);

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="login-container" style={{display: 'none'}} data-expires-in={expiresIn}/>
    )
}
