import React, {useId} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {selectCartHeaders} from "@ducks/carts/selectors";

const CartSelect = ({cartId = 0, onChange, excludeCartId}: {
    cartId: number|null;
    onChange: (cartId: number) => void;
    excludeCartId?: number;
}) => {
    const id = useId();
    const carts = useSelector(selectCartHeaders);

    const changeHandler = (ev: SelectChangeEvent) => {
        onChange(+ev.target.value);
    }

    if (!carts.length) {
        return null;
    }

    const value = `${cartId ?? 0}`;

    return (
        <FormControl fullWidth size="small" variant="filled">
            <InputLabel id={id}>Cart</InputLabel>
            <Select labelId={id} value={value} onChange={changeHandler} label="Cart">
                <MenuItem value={0}>New Cart</MenuItem>
                {carts.map(cart => (
                    <MenuItem key={cart.id} value={cart.id}
                              disabled={cart.id === excludeCartId}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <div>{cart.customerPONo}</div>
                            {cart.shipToCode && (<div>[{cart.shipToCode}] {cart.shipToName}</div>)}
                            {!cart.shipToCode && (<div>{cart.shipToName}</div>)}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
};

export default CartSelect;
