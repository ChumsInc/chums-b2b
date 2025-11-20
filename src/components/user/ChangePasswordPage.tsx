'use client';

import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import PasswordForm from "./PasswordForm";
import Container from "@mui/material/Container";
import React, {useState} from "react";
import {documentTitles} from "@/constants/paths";
import DocumentTitle from "../DocumentTitle";
import {selectUserActionStatus, selectUserProfile} from "@/ducks/user/userProfileSlice";
import type {ChangePasswordProps} from "@/ducks/user/types";
import {useNavigate} from 'react-router';
import {changePassword} from "@/ducks/user/actions";
import {isErrorResponse} from "@/utils/typeguards";

const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectUserActionStatus);
    const profile = useAppSelector(selectUserProfile);
    const [alert, setAlert] = useState<string | null>(null);
    const navigate = useNavigate();

    const cancelHandler = () => {
        navigate('/profile');
    }

    const onSetPassword = async (arg: ChangePasswordProps) => {
        if (!arg.oldPassword || !arg.newPassword) {
            return;
        }
        const res = await dispatch(changePassword(arg));
        if (isErrorResponse(res.payload)) {
            setAlert(res.payload.error ?? null);
        } else {
            navigate('/login', {state: 'Your password has been updated. Please log in again.'});
        }
    }


    return (
        <Container maxWidth="sm">
            <DocumentTitle documentTitle={documentTitles.profileChangePassword}/>
            <Typography component="h1" variant="h1" sx={{mb: 5}}>Change Password</Typography>
            {loading !== 'idle' && <LinearProgress variant="indeterminate"/>}
            <Stack direction="column" spacing={2}>
                {!!alert && (<Alert severity="warning" title="Reset password error:">{alert}</Alert>)}
                <PasswordForm disabled={!profile || loading !== 'idle'} email={profile?.email}
                              onSubmit={onSetPassword} onCancel={cancelHandler}/>
            </Stack>
        </Container>
    )
}

export default ChangePasswordPage
