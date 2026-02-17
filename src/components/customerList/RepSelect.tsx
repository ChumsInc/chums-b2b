import {useEffect, useId} from 'react';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import {longRepNo} from "@/utils/customer.ts";
import {loadRepList} from "@/ducks/reps/actions.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectRepsList} from "@/ducks/reps/salespersonSlice.ts";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";


const RepSelect = ({value = '', onChange}: {
    value: string | null;
    onChange: (value: string | null) => void;
}) => {
    const dispatch = useAppDispatch();
    const reps = useAppSelector(selectRepsList);
    const labelId = useId();
    const inputId = useId();


    useEffect(() => {
        dispatch(loadRepList());
    }, []);

    const options = reps
        .filter(rep => !!rep.active)
        .sort((a, b) => {
            return longRepNo(a).localeCompare(longRepNo(b));
        })
        .map(rep => ({value: longRepNo(rep), text: `${longRepNo(rep)} - ${rep.SalespersonName}`}));

    const changeHandler = (ev: SelectChangeEvent) => {
        return onChange(ev.target.value ?? null);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id={labelId} htmlFor={inputId}>Sales Rep</InputLabel>
            <Select labelId={labelId} label="Sales Rep" variant="standard" inputProps={{id: inputId}}
                    onChange={changeHandler} value={value ?? ''}>
                <MenuItem value="">All Available Reps</MenuItem>
                {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default RepSelect;
