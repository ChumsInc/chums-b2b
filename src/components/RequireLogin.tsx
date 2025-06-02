import React from "react";
import {selectLoggedIn} from "@/ducks/user/selectors";
import AppErrorBoundary from "../common-components/AppErrorBoundary";
import {useAppSelector} from "@/app/configureStore";

const RequireLogin = ({fallback, children}: {
    fallback?: React.ReactNode;
    children: React.ReactNode
}) => {
    const loggedIn = useAppSelector(selectLoggedIn);
    if (!loggedIn || !children) {
        return fallback ?? null;
    }
    return (
        <AppErrorBoundary>
            {children}
        </AppErrorBoundary>
    )
}

export default RequireLogin;
