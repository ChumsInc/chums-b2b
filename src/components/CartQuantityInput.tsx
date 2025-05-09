import React, {ChangeEvent, useId} from 'react';
import FormControl from '@mui/material/FormControl';
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import {visuallyHidden} from "@mui/utils";
import {styled, useTheme} from "@mui/material/styles";

const NumericInput = styled(FilledInput)`
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const CartQuantityInput = ({quantity, unitOfMeasure = 'EA', onChange, min = 0, disabled, required}: {
    quantity: number;
    unitOfMeasure: string;
    onChange: (value: number) => void;
    min?: number;
    disabled?: boolean;
    required?: boolean;
}) => {
    const theme = useTheme();
    const id = useId();

    const incrementHandler = () => {
        onChange(quantity + 1);
    }

    const decrementHandler = () => {
        onChange(Math.max(min, quantity - 1));
    }

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        const _value = +ev.target.value;
        if (isNaN(_value)) {
            return;
        }
        const value = Math.max(_value, 0);
        onChange(value);
    }

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor={id} sx={{...visuallyHidden}}>Quantity</InputLabel>
            <NumericInput value={quantity ?? ''} size="small"
                          onChange={changeHandler}
                          type="number"
                          inputProps={{
                              inputMode: 'numeric',
                              pattern: '[0-9]*',
                              readOnly: disabled,
                              min: 1,
                              maxLength: 4,
                              sx: {textAlign: 'center', minWidth: '4rem', flex: '1 0 4rem'},
                              id: id,
                              autoCorrect: 'off',
                              autoComplete: 'off'
                          }}
                          required={required}
                          aria-label="Quantity to add to cart"
                          startAdornment={
                              <InputAdornment position="start">
                                  <IconButton onClick={decrementHandler} size="small" edge="start"
                                              aria-label="decrease by one"
                                              disabled={disabled || +quantity === min}>
                                      <RemoveIcon/>
                                  </IconButton>
                              </InputAdornment>
                          }
                          endAdornment={
                              <InputAdornment position="end">
                                  <IconButton onClick={incrementHandler} size="small" edge="end"
                                              aria-label="increase by 1"
                                              disabled={disabled}>
                                      <AddIcon/>
                                  </IconButton>
                                  <Box sx={{ml: 1}} color={theme.palette.chumsGrey.dark}>{unitOfMeasure ?? 'EA'}</Box>
                              </InputAdornment>
                          }
            />
        </FormControl>
    )
};

export default CartQuantityInput;
