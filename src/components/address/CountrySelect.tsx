import {type ChangeEvent, useId} from 'react';
import MenuItem from "@mui/material/MenuItem";
import TextField, {type TextFieldProps} from "@mui/material/TextField";
import {getCountryDataList} from 'countries-list';


export interface CountrySelectProps extends Omit<TextFieldProps, 'value' | 'onChange'> {
    value: string | null;
    onChange: (value: string) => void;
}

const CountrySelect = ({value, onChange, id, ...rest}: CountrySelectProps) => {
    const countries = getCountryDataList();
    const _id = id ?? useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        onChange(ev.target.value);
    }


    return (
        <TextField select label="Country"
                   slotProps={{
                       input: {id: _id},
                       inputLabel: {htmlFor: _id}
                   }}
                   {...rest}
                   onChange={changeHandler} value={value ?? ''} fullWidth>
            <MenuItem>Select One</MenuItem>
            {countries.map(option => (
                <MenuItem key={option.iso3} value={option.iso3}>{option.name}</MenuItem>
            ))}
        </TextField>
    )
}

export default CountrySelect;
