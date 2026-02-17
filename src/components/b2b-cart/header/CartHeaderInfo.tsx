import type {B2BCartHeader} from "chums-types/b2b";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {eventChangeHandler} from "@/components/b2b-cart/header/cartHeaderUtils.ts";
import type {RefObject} from "react";

export interface CartHeaderInfoProps {
    cartHeader: B2BCartHeader | null;
    customerPORef: RefObject<HTMLInputElement | null>;
    onChange: (arg: Partial<B2BCartHeader>) => void;
}

export default function CartHeaderInfo({
                                           cartHeader,
                                           customerPORef,
                                           onChange,
                                       }: CartHeaderInfoProps) {
    if (!cartHeader) {
        return null;
    }
    const orderDate = dayjs(cartHeader.dateCreated).format('YYYY-MM-DD');
    return (
        <Stack spacing={2} direction="column">
            <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                <TextField label="Cart Created" type="date" fullWidth variant="filled" size="small"
                           value={orderDate} placeholder=""
                           slotProps={{
                               htmlInput: {readOnly: true}
                           }}/>
                <TextField label="Cart Expires" type="date" size="small" variant="filled" fullWidth
                           value={dayjs(cartHeader.shipExpireDate).format('YYYY-MM-DD')}
                           slotProps={{
                               htmlInput: {readOnly: true}
                           }}/>
            </Stack>
            <TextField label="Cart Name" type="text" fullWidth variant="filled" size="small"
                       value={cartHeader?.customerPONo ?? ''} required
                       onChange={eventChangeHandler("customerPONo", onChange)}
                       slotProps={{
                           htmlInput: {ref: customerPORef, maxLength: 30}
                       }}/>
            <TextField label="Promo Code" type="text" fullWidth
                       slotProps={{
                           htmlInput: {maxLength: 30}
                       }}
                       value={cartHeader?.promoCode ?? ''} onChange={eventChangeHandler('promoCode', onChange)}
                       variant="filled" size="small"/>
        </Stack>
    )
}
