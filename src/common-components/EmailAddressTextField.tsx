import React, {ChangeEvent, InputHTMLAttributes} from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const EmailAddressTextField = ({
                                   value,
                                   onChange,
                                   label = '',
                                   inputProps
                               }: {
    label: string;
    value: string;
    onChange: (arg: ChangeEvent<HTMLInputElement>) => void;
    inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

}) => {
    return (
        <>
            <TextField label={label} variant="filled" fullWidth size="small" type="email"
                       value={value} onChange={onChange}
                       slotProps={{
                           input: {
                               startAdornment: <InputAdornment position="start"><AlternateEmailIcon/></InputAdornment>
                           },
                           htmlInput: {...inputProps}
                       }}/>
        </>
    )
};

export default EmailAddressTextField;
