import {useCallback, useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectSignUpProfile, selectSignUpStatus} from "@/ducks/sign-up/signUpSlice";
import {loadSignUpProfile} from "@/ducks/sign-up/actions";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PasswordForm from "./PasswordForm";
import {setNewPassword} from "@/ducks/user/actions";
import type {ChangePasswordResponse, SetNewPasswordProps} from "@/ducks/user/types";
import Alert from "@mui/material/Alert";
import {isErrorResponse} from "@/utils/typeguards";
import useAuthKey from "@/hooks/useAuthKey.ts";


const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectSignUpProfile);
    const loading = useAppSelector(selectSignUpStatus);
    const {hash, key} = useAuthKey()
    const [alert, setAlert] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!hash || !key) {
            return;
        }
        dispatch(loadSignUpProfile({hash, key}))
            .then(res => {
                const payload = res.payload;
                if (isErrorResponse(payload)) {
                    setAlert(payload.error ?? 'An error occurred while loading the request.');
                }
            })
    }, [hash, key]);

    const onSetPassword = useCallback(async (arg: Pick<SetNewPasswordProps, 'newPassword'>) => {
        if (!key || !hash) {
            return;
        }
        const res = await dispatch(setNewPassword(({...arg, hash, key})));
        const payload: ChangePasswordResponse | null = res.payload as ChangePasswordResponse | null;
        if (payload?.success) {
            navigate('/login', {state: {message: 'Your password has been updated. Please log in again.'}});
        } else if (payload?.error) {
            setAlert(payload.error);
        }

    }, [hash, key])

    const cancelHandler = () => {
        navigate('/login');
    }


    return (
        <Container maxWidth="sm">
            <Typography component="h1" variant="h1" sx={{my: 3}}>Chums B2B Portal</Typography>
            {loading !== 'idle' && <LinearProgress variant="indeterminate"/>}
            {profile && (<Typography component="h2" variant="h2">Welcome {profile?.name}</Typography>)}
            <Stack direction="column" spacing={2}>
                {!!alert && (<Alert severity="warning" title="Reset password error:">{alert}</Alert>)}
                <PasswordForm isPasswordReset={true} disabled={!profile} email={profile?.email}
                              onSubmit={onSetPassword} onCancel={cancelHandler}/>
            </Stack>
        </Container>
    )
}

export default ResetPassword;
