import {type ReactNode} from 'react';
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import ErrorBoundary from "./common/ErrorBoundary";
import {useAppSelector} from "@/app/configureStore";

const RequireLogin = ({fallback, children}: {
    fallback?: ReactNode;
    children: ReactNode
}) => {
    const loggedIn = useAppSelector(selectLoggedIn);
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
