import type {B2BCartHeader} from "@/types/cart/cart-header";
import {cartProgress} from "@/utils/cart.ts";
import Stack from "@mui/material/Stack";
import CartPaymentSelect from "@/components/b2b-cart/header/CartPaymentSelect.tsx";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import type {CartProgress} from "chums-types/b2b";
import type {RefObject} from "react";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";
import {eventChangeHandler, valueChangeHandler} from "@/components/b2b-cart/header/cartHeaderUtils.ts";

export interface CartHeaderPaymentProps {
    cartHeader: B2BCartHeader | null;
    progress: CartProgress;
    paymentMethodRef: RefObject<HTMLDivElement | null>;
    onChange: (arg: Partial<B2BCartHeader>) => void;
}

export default function CartHeaderPayment({
                                              cartHeader,
                                              progress,
                                              paymentMethodRef,
                                              onChange
                                          }: CartHeaderPaymentProps) {
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartHeader?.id ?? -1));
    if (!cartHeader) {
        return null;
    }

    return (
        <Collapse in={progress >= cartProgress.payment} collapsedSize={0}>
            <Stack spacing={2} direction="column">
                <CartPaymentSelect value={cartHeader?.PaymentType ?? ''} error={!cartHeader?.PaymentType}
                                   ref={paymentMethodRef} required
                                   disabled={loadingStatus !== 'idle'}
                                   onChange={valueChangeHandler('PaymentType', onChange)}/>
                <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                           value={cartHeader?.customerPONo ?? ''}
                           onChange={eventChangeHandler('customerPONo', onChange)}
                           slotProps={{
                               htmlInput: {maxLength: 30}
                           }}
                           disabled={loadingStatus !== 'idle'}
                           error={!cartHeader.customerPONo}
                           required/>
            </Stack>
        </Collapse>
    )
}
