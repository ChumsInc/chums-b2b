import React, {ChangeEvent, useId, useRef} from "react";
import {useAppDispatch} from "@app/configureStore";
import {useSelector} from "react-redux";
import FilledInput from '@mui/material/FilledInput'
import IconButton from "@mui/material/IconButton";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import {selectCartShippingAccount} from "@ducks/b2b-cart/selectors";
import {setCartShippingAccount} from "@ducks/b2b-cart/actions";

const CustomerShippingAccountControl = ({readOnly = false}:{
    readOnly?: boolean;
}) => {
    const dispatch = useAppDispatch();
    const shippingAccount = useSelector(selectCartShippingAccount);
    const id = useId();
    const ref = useRef<HTMLInputElement>()

    const clickHandler = () => {
        if (readOnly) {
            return;
        }
        const enabled = !shippingAccount.enabled;
        dispatch(setCartShippingAccount({...shippingAccount, enabled}))
        if (enabled && ref.current) {
            ref.current.focus();
        }
    };

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        if (readOnly || !shippingAccount.enabled) {
            return;
        }
        dispatch(setCartShippingAccount({...shippingAccount, value: ev.target.value}))
    }

    return (
        <FormControl variant="filled" fullWidth size="small" error={shippingAccount.enabled && !shippingAccount.value}>
            <InputLabel htmlFor={id}>Use your shipping account</InputLabel>
            <FilledInput type="text" value={shippingAccount.enabled ? shippingAccount.value : ''}
                   onChange={changeHandler} inputProps={{readOnly, id, ref, maxLength: 9}}
                   startAdornment={
                       <InputAdornment position="start">
                           <IconButton aria-label="toggle use your shipping account"
                                       onClick={clickHandler} onMouseDown={(ev) => ev.preventDefault()}>
                               {shippingAccount.enabled ? <CheckBoxIcon/> : <CheckBoxOutlineBlankIcon/>}
                           </IconButton>
                       </InputAdornment>
                   }/>
        </FormControl>
    )
};

export default CustomerShippingAccountControl;
