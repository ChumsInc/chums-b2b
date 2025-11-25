import {type ReactNode, useEffect, useState} from 'react';
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import ErrorBoundary from "./common/ErrorBoundary";
import {useAppSelector} from "@/app/hooks";

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
