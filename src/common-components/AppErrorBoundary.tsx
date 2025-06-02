import React from "react";
import {selectUserProfile} from "@/ducks/user/selectors";
import {ErrorBoundary as ReactErrorBoundary, FallbackProps} from "react-error-boundary";
import {postErrors} from "@/api/fetch";
import Alert from "@mui/material/Alert";
import {useAppSelector} from "@/app/configureStore";

function ErrorFallback({error}: FallbackProps) {
    // resetErrorBoundary();
    return (
        <Alert severity="error">
            <strong>Sorry! Something went wrong.</strong>
            <div style={{whiteSpace: 'pre-wrap'}}>{error.message}</div>
        </Alert>
    )
}

export default function AppErrorBoundary({reportErrors, children}: {
    reportErrors?: boolean | undefined;
    children: React.ReactNode;
}) {
    const userProfile = useAppSelector(selectUserProfile);

    const logError = (error: Error, info: React.ErrorInfo) => {
        if (reportErrors === false) {
            return;
        }
        postErrors({
            message: error.message,
            userId: userProfile?.id,
            componentStack: info.componentStack ?? ''
        })
            .catch(err => console.log(err.message));
    }

    return (
        <ReactErrorBoundary onError={logError} FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    )
}
