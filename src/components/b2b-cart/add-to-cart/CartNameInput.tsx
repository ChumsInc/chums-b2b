import {type ChangeEvent, useId} from 'react';
import TextField, {type TextFieldProps} from "@mui/material/TextField";
import {useAddToCart} from "@/components/b2b-cart/add-to-cart/AddToCartContext.tsx";

export type CartNameInputProps = Omit<TextFieldProps, 'value' | 'onChange'>;

export default function CartNameInput({error, ...rest}: CartNameInputProps) {
    const {cartName, setCartName} = useAddToCart();
    const id = useId();
    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setCartName(ev.target.value);
    }

    return (
        <TextField id={id} label="Cart Name" value={cartName} onChange={changeHandler}
                   slotProps={{
                       htmlInput: {maxLength: 30}
                   }}
                   error={error || !cartName}
                   size="small" variant="filled" {...rest} />
    )
}
