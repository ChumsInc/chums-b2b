import {type RefObject, useId} from 'react';
import type {PaymentType} from "@/types/customer.ts";
import InputLabel from "@mui/material/InputLabel";
import Select, {type SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl, {type FormControlProps} from "@mui/material/FormControl";
import {type InputBaseComponentProps} from "@mui/material/InputBase";
import {PAYMENT_TYPES} from "@/constants/account.ts";
import FormHelperText from "@mui/material/FormHelperText";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectActiveCustomerPaymentCards} from "@/ducks/customer/customerPaymentCardsSlice.ts";

export interface CartPaymentSelectProps extends Omit<FormControlProps, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    readOnly?: boolean;
    required?: boolean;
    inputProps?: InputBaseComponentProps;
    ref?: RefObject<HTMLDivElement | null>;
}

export default function CartPaymentSelect({
                                              value,
                                              onChange,
                                              readOnly,
                                              required,
                                              inputProps,
                                              ref,
                                              ...formControlProps
                                          }: CartPaymentSelectProps) {
    const id = useId();
    const paymentCards = useAppSelector(selectActiveCustomerPaymentCards);

    const customerPaymentCardTypes: PaymentType[] = paymentCards
        .filter(cc => PAYMENT_TYPES[cc.PaymentType]?.allowCC && !PAYMENT_TYPES[cc.PaymentType].disabled)
        .map(cc => {
            const paymentType = PAYMENT_TYPES[cc.PaymentType];
            return {
                ...paymentType,
                code: `${paymentType.code}:${cc.CreditCardID}`,
                customerValue: cc.CreditCardID
            }
        });

    const genericPaymentTypes = Object.values(PAYMENT_TYPES).filter(pt => !pt.disabled && !pt.allowCC);

    const changeHandler = (ev: SelectChangeEvent) => {
        onChange(ev.target.value);
    }

    return (
        <FormControl fullWidth variant="filled" size="small" {...formControlProps} required={required}>
            <InputLabel id={id}>Payment Method</InputLabel>
            <Select onChange={changeHandler} value={value ?? ''} ref={ref}
                    labelId={id}
                    readOnly={readOnly} required={required}
                    inputProps={inputProps} variant="filled">
                <MenuItem value=""></MenuItem>
                {customerPaymentCardTypes.map(pt => (
                    <MenuItem key={pt.code} value={pt.code}>
                        {pt.description} [{pt.customerValue}]
                    </MenuItem>
                ))}
                {genericPaymentTypes.map(pt => (
                    <MenuItem key={pt.code} value={pt.code}>
                        {pt.description}
                    </MenuItem>
                ))}
            </Select>
            {PAYMENT_TYPES[value]?.message && (
                <FormHelperText>{PAYMENT_TYPES[value]?.message}</FormHelperText>
            )}
        </FormControl>
    )
}
