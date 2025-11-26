import {type SyntheticEvent, useCallback, useEffect, useRef} from 'react';
import {minCheckInterval, selectShouldAlertVersion, selectVersion} from "@/ducks/version";
import {ignoreVersion, loadVersion} from "@/ducks/version/actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import styled from "@emotion/styled";


const VersionContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`

export default function AppVersion() {
    const dispatch = useAppDispatch();
    const version = useAppSelector(selectVersion);
    const shouldAlert = useAppSelector(selectShouldAlertVersion);
    const intervalRef = useRef<number>(0);
    const onUpdateVersion = useCallback((force: boolean = false) => {
        dispatch(loadVersion(force))
    }, [])

    const visibilityChangeHandler = useCallback(() => {
        onUpdateVersion();
    }, [])

    useEffect(() => {
        if (!version) {
            onUpdateVersion();
        }
        intervalRef.current = window.setInterval(onUpdateVersion, minCheckInterval);
        return () => {
            window.clearInterval(intervalRef.current);
            window.removeEventListener('visibilityChange', visibilityChangeHandler)
        }
    }, [version]);


    const onDismissUpdate = (ev: SyntheticEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        dispatch(ignoreVersion());
    }

    const onUpdate = () => {
        window.location.reload();
    }


    return (
        <div>
            <VersionContainer onClick={() => onUpdateVersion(true)}>
                <div>Version:</div>
                <div>{version}</div>
            </VersionContainer>
            <Snackbar open={shouldAlert} autoHideDuration={10000}>
                <Alert severity="info" sx={{width: '100%'}} onClose={onDismissUpdate} onClick={onUpdate}>
                    <strong>Update Available! Click here to refresh</strong>
                </Alert>
            </Snackbar>
        </div>
    );
}
