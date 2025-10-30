import React, {type FormEvent, useState} from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PasswordTextField from "./PasswordTextField";
import Button from "@mui/material/Button"
import type {ChangePasswordProps, SetNewPasswordProps} from "@/ducks/user/types";
import TextField from "@mui/material/TextField";

export interface PasswordFormProps {
    email?: string;
    disabled?: boolean;
    isPasswordReset?: boolean;
    onSubmit: ((arg: ChangePasswordProps) => void) | ((arg: Pick<SetNewPasswordProps, 'newPassword'>) => void);
    onCancel: () => void;
}

const maxPasswordLength = 256;
const minPasswordLength = 8;

const PasswordForm = ({email, disabled, isPasswordReset, onSubmit, onCancel}: PasswordFormProps) => {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [password1, setPassword1] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');


    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        return onSubmit({oldPassword, newPassword: password1});
    }


    return (
        <Box>
            <Typography component="h3" variant="h3" sx={{my: 3}}>
                {isPasswordReset ? 'Set your password' : 'Update your password'}
            </Typography>
            <Stack direction="column" spacing={2} component="form" onSubmit={submitHandler} name="username">
                <TextField variant="filled" value={email ?? ''} label="Email"
                           slotProps={{
                               htmlInput: {readOnly: true, autoComplete: 'username'},
                           }}/>
                {!isPasswordReset && (
                    <PasswordTextField type="password" label="Old Password" variant="filled"
                                       value={oldPassword} onChange={(ev) => setOldPassword(ev.target.value)}
                                       slotProps={{
                                           htmlInput: {
                                               maxLength: maxPasswordLength,
                                               minLength: minPasswordLength,
                                               autoComplete: 'current-password'
                                           }
                                       }}
                                       fullWidth required
                    />
                )}
                <PasswordTextField type="password" label="New Password" variant="filled"
                                   fullWidth required
                                   value={password1} onChange={(ev) => setPassword1(ev.target.value)}
                                   slotProps={{
                                       htmlInput: {
                                           maxLength: maxPasswordLength,
                                           minLength: minPasswordLength,
                                           autoComplete: 'new-password'
                                       },
                                       formHelperText: {component: 'div'}
                                   }}/>
                <PasswordTextField type="password" label="Confirm New Password" variant="filled"
                                   fullWidth required
                                   value={password2} onChange={(ev) => setPassword2(ev.target.value)}
                                   slotProps={{
                                       htmlInput: {
                                           maxLength: maxPasswordLength,
                                           minLength: minPasswordLength,
                                           autoComplete: 'new-password'
                                       }
                                   }}
                                   helperText={password2 !== password1 ? 'Your new passwords do not match' : ''}/>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button type="button" variant="text" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="contained"
                            disabled={password1 !== password2 || disabled}>
                        Update Password
                    </Button>
                </Stack>
            </Stack>

        </Box>
    )
}

export default PasswordForm;
