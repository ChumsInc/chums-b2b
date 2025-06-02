import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import Alert, {AlertColor} from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button"
import React, {FormEvent, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectResettingPassword} from "../selectors";
import {resetPassword} from "../actions";
import AccessWarningAlert from "./AccessWarningAlert";
import {Link as NavLink, useNavigate} from "react-router";
import Container from "@mui/material/Container";

const RequestPasswordResetForm = () => {
    const dispatch = useAppDispatch();
    const isResettingPassword = useAppSelector(selectResettingPassword);
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState('');
    const [responseType, setResponseType] = useState<AlertColor | null>(null)
    const navigate = useNavigate();


    const cancelHandler = () => {
        navigate('/login');
    }

    const submitHandler = async (ev: FormEvent) => {
        ev.preventDefault();
        const res = await dispatch(resetPassword(email));
        if (res.payload) {
            setResponse("If your email address is in our database, we will send you an email to reset your password.");
            setResponseType('success');
        } else {
            setResponseType('warning');
            setResponse('Sorry, An error occurred.');
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h1" component="h1" sx={{my: 3}}>Chums B2B Portal</Typography>
            <Box component="form" onSubmit={submitHandler}>
                <Typography component="h2" variant="h2">Reset Your Password</Typography>
                {responseType !== 'success' && (
                    <Alert severity="info" sx={{mb: 1}}>
                        If your email address is in our database, we will send you an email to reset your password.
                    </Alert>)}
                <Stack direction="column" spacing={1}>
                    {isResettingPassword && (
                        <LinearProgress variant="indeterminate" title="Processing Password Rest Request"/>
                    )}
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <AccountCircle sx={{color: 'action.active', mr: 1}}/>
                        <TextField type="email" fullWidth
                                   variant="filled" label="Email"
                                   value={email} onChange={ev => setEmail(ev.target.value)}
                                   autoComplete="username"
                                   slotProps={{
                                       inputLabel: {shrink: true}
                                   }}
                                   required/>
                    </Box>
                    <Stack direction="row" spacing={2} useFlexGap justifyContent="flex-end">
                        <Button type="button" variant="text" component={NavLink} to="/login">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" disabled={responseType === 'success'}>Reset
                            Password</Button>
                    </Stack>
                </Stack>
            </Box>
            {!!response && (
                <Alert severity={responseType ?? 'info'} onClose={cancelHandler}>
                    {response}
                </Alert>
            )}
            <AccessWarningAlert/>
        </Container>
    )
}

export default RequestPasswordResetForm;
