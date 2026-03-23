import {type RefObject, useId} from 'react';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, {type SelectChangeEvent, type SelectProps} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {selectCartHeaders} from "@/ducks/carts/cartHeadersSlice";
import localStore from "@/utils/LocalStore";
import {STORE_CURRENT_CART} from "@/constants/stores";
import {useAppSelector} from "@/app/hooks";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useAddToCart} from "@/components/b2b-cart/add-to-cart/AddToCartContext.tsx";

export interface CartSelectProps extends Pick<SelectProps, 'required'> {
    excludeCartId?: number;
    ref?: RefObject<HTMLSelectElement>
}

export default function CartSelect({
                                       excludeCartId,
                                       required,
                                       ref
                                   }: CartSelectProps) {
    const {cartId, setCartId} = useAddToCart();
    const id = useId();
    const carts = useAppSelector(selectCartHeaders);
    const {permissions, shipTo} = useCustomer();

    const changeHandler = (ev: SelectChangeEvent) => {
        localStore.setItem<number>(STORE_CURRENT_CART, +ev.target.value)
        setCartId(+ev.target.value);
    }

    if (!carts.length) {
        return null;
    }


    const value = excludeCartId === cartId ? '0' : `${cartId ?? 0}`;

    return (
        <FormControl fullWidth size="small" variant="filled">
            <InputLabel id={id}>Cart</InputLabel>
            <Select labelId={id} value={value} label="Cart" onChange={changeHandler} required={required} ref={ref}>
                <MenuItem value={0}>New Cart</MenuItem>
                {carts
                    .filter(cart => permissions?.billTo || cart.shipToCode === shipTo?.ShipToCode)
                    .map(cart => (
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
}
