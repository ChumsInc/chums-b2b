import {type ReactNode, useEffect, useState} from 'react';
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import ErrorBoundary from "./ErrorBoundary.tsx";
import {useAppSelector} from "@/app/hooks.ts";

const RequireLogin = ({fallback, children}: {
    fallback?: ReactNode;
    children: ReactNode
}) => {
    const _loggedIn = useAppSelector(selectLoggedIn);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(_loggedIn);
    }, [_loggedIn]);

    if (!loggedIn || !children) {
        return fallback ?? null;
    }
    return (
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    )
}

export default RequireLogin;
