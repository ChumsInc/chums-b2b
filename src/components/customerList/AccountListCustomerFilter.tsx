import {type ChangeEvent, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {selectCustomersSearchFilter, setCustomersFilter} from "@/ducks/customers/customerListSlice";

const debounceTimeout = 500;

const AccountListCustomerFilter = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector(selectCustomersSearchFilter);
    const timer = useRef<number>(0);
    const [debouncedSearch, setDebouncedSearch] = useState<string>(filter);
    const [value, setValue] = useState<string>(filter);

    useEffect(() => {
        dispatch(setCustomersFilter(debouncedSearch));
    }, [debouncedSearch]);

    useEffect(() => {
        setValue(filter);
        setDebouncedSearch(filter);
    }, [filter]);

    useEffect(() => {
        timer.current = window.setTimeout(() => setDebouncedSearch(value), debounceTimeout);
        return () => {
            window.clearTimeout(timer.current);
        }
    }, [value])

    const filterChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    }

    return (
        <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
            <SearchIcon sx={{color: 'action.active', mr: 1, my: 0.5}}/>
            <TextField variant="standard" type="search"
                       slotProps={{
                           htmlInput: {maxLength: 50}
                       }}
                       value={value}
                       onChange={filterChangeHandler} label="Filter Customers" fullWidth/>
        </Box>
    )
}

export default AccountListCustomerFilter;
