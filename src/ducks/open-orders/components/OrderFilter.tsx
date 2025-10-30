import React, {type InputHTMLAttributes, useId} from 'react';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@mui/material/InputAdornment";

export interface OrderFilterProps extends InputHTMLAttributes<HTMLInputElement> {
    children: React.ReactNode;
}

const OrderFilter = ({value, onChange, children, placeholder, className, id, ...rest}: OrderFilterProps) => {
    const _id = useId();
    if (!id) {
        id = _id;
    }
    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField type="search" value={value} onChange={onChange} variant="standard" size="small" id={id}
                       fullWidth
                       slotProps={{
                           input: {
                               startAdornment: (
                                   <InputAdornment position="start"><SearchIcon/></InputAdornment>
                               )
                           },
                           htmlInput: {...rest}
                       }}
                       placeholder={placeholder ?? 'Order or PO #'} className={className}/>
            {children}
        </Stack>
    )
};

export default OrderFilter;
