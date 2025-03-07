import React, {ChangeEvent, useEffect, useId, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import FilledInput from '@mui/material/FilledInput'
import IconButton from "@mui/material/IconButton";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import {setCartShippingAccount} from "@ducks/carts/actions";
import {CustomerShippingAccount, ShippingMethod} from "@typeDefs/customer";
import {ShippingMethods} from "@utils/general";
import {selectCartShippingAccount} from "@ducks/carts/activeCartSlice";

const emptyShippingAccount:CustomerShippingAccount = {
    value: '',
    enabled: false
}
const CustomerShippingAccountControl = ({readOnly = false, shipVia}: {
    readOnly?: boolean;
    shipVia?: string | null;
}) => {
    const dispatch = useAppDispatch();
    const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null);
    const shippingAccount = useAppSelector(selectCartShippingAccount);
    const id = useId();
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (shipVia) {
            setShippingMethod(ShippingMethods[shipVia] ?? null);
        } else {
            setShippingMethod(null);
        }
    }, [shipVia]);

    const clickHandler = () => {
        if (readOnly) {
            return;
        }
        const enabled = !shippingAccount?.enabled;
        dispatch(setCartShippingAccount({...(shippingAccount ?? emptyShippingAccount), enabled}))
        if (enabled && ref.current) {
            ref.current.focus();
        }
    };

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        if (readOnly || !shippingAccount?.enabled) {
            return;
        }
        dispatch(setCartShippingAccount({...(shippingAccount ?? emptyShippingAccount), value: ev.target.value}))
    }

    return (
        <FormControl variant="filled" fullWidth size="small" error={shippingAccount?.enabled && !shippingAccount.value}
                     disabled={!shippingMethod?.allowCustomerAccount || !shippingAccount?.enabled}>
            <InputLabel htmlFor={id}>Use your shipping account</InputLabel>
            <FilledInput type="text" value={shippingAccount?.enabled ? shippingAccount.value : ''}
                         onChange={changeHandler} inputProps={{readOnly, id, ref, maxLength: 9}}
                         startAdornment={
                             <InputAdornment position="start">
                                 <IconButton aria-label="toggle use your shipping account"
                                             disabled={!shippingMethod?.allowCustomerAccount}
                                             onClick={clickHandler} onMouseDown={(ev) => ev.preventDefault()}>
                                     {shippingAccount?.enabled ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                                 </IconButton>
                             </InputAdornment>
                         }/>
        </FormControl>
    )
};

export default CustomerShippingAccountControl;
