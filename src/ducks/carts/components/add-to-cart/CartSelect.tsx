import React, {useId} from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {selectCartHeaders} from "@/ducks/carts/cartHeadersSlice";
import localStore from "@/utils/LocalStore";
import {STORE_CURRENT_CART} from "@/constants/stores";
import {useAppSelector} from "@/app/configureStore";

export interface CartSelectProps extends Pick<SelectProps, 'required'> {
    cartId: number | null;
    onChange: (cartId: number) => void;
    excludeCartId?: number;
}

export default React.forwardRef<HTMLSelectElement, CartSelectProps>(
    function CartSelect({
                            cartId = 0,
                            onChange,
                            excludeCartId,
                            required
                        }, ref) {
        const id = useId();
        const carts = useAppSelector(selectCartHeaders);

        const changeHandler = (ev: SelectChangeEvent) => {
            localStore.setItem<number>(STORE_CURRENT_CART, +ev.target.value)
            onChange(+ev.target.value);
        }

        if (!carts.length) {
            return null;
        }

        const value = `${cartId ?? 0}`;

        return (
            <FormControl fullWidth size="small" variant="filled">
                <InputLabel id={id}>Cart</InputLabel>
                <Select labelId={id} value={value} label="Cart" onChange={changeHandler} required={required} ref={ref}>
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
    })
