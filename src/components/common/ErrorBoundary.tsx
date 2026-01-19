import type {ErrorInfo, ReactNode} from 'react';
import {selectUserProfile} from "@/ducks/user/userProfileSlice";
import {ErrorBoundary as ReactErrorBoundary, type FallbackProps} from 'react-error-boundary';
import {postErrors, type PostErrorsArg} from "@/api/fetch";
import Alert from "@mui/material/Alert";
import {useAppSelector} from "@/app/hooks";
import debug from "@/utils/debug.ts";

function ErrorFallback({error}: FallbackProps) {
    if (!error) {
        return null;
    }
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
            <div style={{whiteSpace: 'pre-wrap'}}>Unknown error</div>
        </Alert>
    )
}

export default function ErrorBoundary({reportErrors, children}: {
    reportErrors?: boolean | undefined;
    children: ReactNode;
}) {
    const userProfile = useAppSelector(selectUserProfile);

    const logError = (error: Error|unknown, info: ErrorInfo) => {
        if (reportErrors === false) {
            return;
        }
        if (!(error instanceof Error)) {
            return;
        }
        const arg:PostErrorsArg = {
            message: error.message,
            userId: userProfile?.id,
            componentStack: info.componentStack ?? ''
        }
        postErrors(arg)
            .catch(err => debug(err.message));
    }

    return (
        <ReactErrorBoundary onError={logError} FallbackComponent={ErrorFallback}>
            {children}
        </ReactErrorBoundary>
    )
}
