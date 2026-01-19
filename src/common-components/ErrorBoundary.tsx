import React from 'react';
import {useSelector} from 'react-redux';
import {selectUserProfile} from "@/ducks/user/selectors";
import {ErrorBoundary as ReactErrorBoundary, FallbackProps} from 'react-error-boundary';
import {postErrors} from "@/api/fetch";
import Alert from "@mui/material/Alert";

function ErrorFallback({error}: FallbackProps) {
    // resetErrorBoundary();
    if (error instanceof Error) {
        return (
            <Alert severity="error">
                <strong>Sorry! Something went wrong.</strong>
                <div style={{whiteSpace: 'pre-wrap'}}>{error.message}</div>
            </Alert>
        )
    }
    return (
        <Alert severity="error">
            <strong>Sorry! Something went wrong.</strong>
            <div style={{whiteSpace: 'pre-wrap'}}>Unknown Error</div>
        </Alert>
    )

}

export default function ErrorBoundary({reportErrors, children}: {
    reportErrors?: boolean|undefined;
    children: React.ReactNode;
}) {
    const userProfile = useSelector(selectUserProfile);

    const logError = (error: Error|unknown, info: React.ErrorInfo) => {
        if (reportErrors === false || !(error instanceof Error) || !error.message) {
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
