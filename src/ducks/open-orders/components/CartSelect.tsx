import React, {useId} from 'react';
import {NEW_CART} from "@constants/orders";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {selectCartHeaders} from "@ducks/carts/selectors";

const CartSelect = ({cartNo = '', onChange, excludeCartId}: {
    cartNo: string;
    onChange: (value: string) => void;
    excludeCartId?: number;
}) => {
    const id = useId();
    const carts = useSelector(selectCartHeaders);

    const changeHandler = (ev: SelectChangeEvent) => {
        onChange(ev.target.value);
    }

    if (!carts.length) {
        return null;
    }
    return (
        <FormControl fullWidth size="small" variant="filled">
            <InputLabel id={id}>Cart</InputLabel>
            <Select labelId={id} value={cartNo}
                    onChange={changeHandler} label="Cart">
                <MenuItem value={NEW_CART}>New Cart</MenuItem>
                {carts.map(cart => (
                    <MenuItem key={cart.id} value={cart.id}
                              disabled={cart.id === excludeCartId}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <div>{cart.customerPONo}</div>
                            <div>[{cart.shipToCode}] {cart.shipToName}</div>
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default CartSelect;
