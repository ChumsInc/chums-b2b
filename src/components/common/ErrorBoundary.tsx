import {type ErrorInfo, type ReactNode} from 'react';
import {selectUserProfile} from "@/ducks/user/userProfileSlice";
import {ErrorBoundary as ReactErrorBoundary, type FallbackProps} from 'react-error-boundary';
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

export default function ErrorBoundary({reportErrors, children}: {
    reportErrors?: boolean | undefined;
    children: ReactNode;
}) {
    const userProfile = useAppSelector(selectUserProfile);

    const logError = (error: Error, info: ErrorInfo) => {
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
