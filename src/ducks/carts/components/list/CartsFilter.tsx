import React, {ChangeEvent, useId} from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {loadCarts} from "@ducks/carts/actions";
import Button from "@mui/material/Button";
import {useSelector} from "react-redux";
import {selectCustomerKey} from "@ducks/customer/selectors";
import {selectCartsSearch, setCartSearch} from "@ducks/carts/cartHeadersSlice";

export default function CartsFilter() {
    const dispatch = useAppDispatch();
    const search = useAppSelector(selectCartsSearch);
    const customerKey = useSelector(selectCustomerKey);
    const id = useId();

    const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        dispatch(setCartSearch(evt.target.value));
    }

    const reloadHandler = () => {
        dispatch(loadCarts(customerKey));
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField type="search" value={search} onChange={changeHandler} variant="standard" size="small" id={id}
                       fullWidth
                       slotProps={{
                           input: {
                               startAdornment: (
                                   <InputAdornment position="start"><SearchIcon/></InputAdornment>
                               )
                           }
                       }}
                       placeholder={'Order or PO #'}/>
            <Button variant="text" onClick={reloadHandler}>
                Reload
            </Button>
        </Stack>
    );
}
