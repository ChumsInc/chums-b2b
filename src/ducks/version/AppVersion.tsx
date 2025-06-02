import React, {useEffect, useRef} from "react";
import {minCheckInterval, selectShouldAlertVersion, selectVersion} from "./index";
import {ignoreVersion, loadVersion} from "./actions";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useIsSSR} from "@/hooks/is-server-side";


export default function AppVersion() {
    const isSSR = useIsSSR();
    const dispatch = useAppDispatch();
    const version = useAppSelector(selectVersion);
    const shouldAlert = useAppSelector(selectShouldAlertVersion);
    const intervalRef = useRef<number>(0);

    useEffect(() => {
        if (isSSR) {
            return;
        }

        if (!version) {
            onUpdateVersion();
        }
        intervalRef.current = window.setInterval(onUpdateVersion, minCheckInterval);
        return () => {
            if (isSSR) {
                return;
            }
            window.clearInterval(intervalRef.current);
            window.removeEventListener('visibilityChange', visibilityChangeHandler)
        }
    }, [isSSR, version]);

    const onUpdateVersion = (force = false) => {
        dispatch(loadVersion(force));
    }

    const visibilityChangeHandler = () => {
        onUpdateVersion()
    }

    const onDismissUpdate = (ev: React.SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        dispatch(ignoreVersion());
    }

    const onUpdate = () => {
        window.location.reload();
    }


    if (isSSR) {
        return;
    }

    return (
        <div>
            <span onClick={() => onUpdateVersion(true)} className="app__version">Version: {version}</span>
            <Snackbar open={shouldAlert} autoHideDuration={10000}>
                <Alert severity="info" sx={{width: '100%'}} onClose={onDismissUpdate} onClick={onUpdate}>
                    <strong>Update Available! Click here to refresh</strong>
                </Alert>
            </Snackbar>
        </div>
    );
}
