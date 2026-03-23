import type {B2BCartHeader} from "chums-types/b2b";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import {eventChangeHandler} from "@/components/b2b-cart/header/cartHeaderUtils.ts";
import type {RefObject} from "react";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";

export interface CartHeaderInfoProps {
    customerPORef: RefObject<HTMLInputElement | null>;
}

export default function CartHeaderInfo({
                                           customerPORef,
                                       }: CartHeaderInfoProps) {
    const {value, updateValue} = useEditorContext<B2BCartHeader>()
    const orderDate = dayjs(value.dateCreated).format('YYYY-MM-DD');
    return (
        <Stack spacing={2} direction="column">
            <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                <TextField label="Cart Created" type="date" fullWidth variant="filled" size="small"
                           value={orderDate} placeholder=""
                           slotProps={{
                               htmlInput: {readOnly: true}
                           }}/>
                <TextField label="Cart Expires" type="date" size="small" variant="filled" fullWidth
                           value={dayjs(value.shipExpireDate).format('YYYY-MM-DD')}
                           slotProps={{
                               htmlInput: {readOnly: true}
                           }}/>
            </Stack>
            <TextField label="Cart Name" type="text" fullWidth variant="filled" size="small"
                       value={value?.customerPONo ?? ''} required
                       onChange={eventChangeHandler("customerPONo", updateValue)}
                       slotProps={{
                           htmlInput: {ref: customerPORef, maxLength: 30}
                       }}/>
            <TextField label="Promo Code" type="text" fullWidth
                       slotProps={{
                           htmlInput: {maxLength: 30}
                       }}
                       value={value?.promoCode ?? ''} onChange={eventChangeHandler('promoCode', updateValue)}
                       variant="filled" size="small"/>
        </Stack>
    )
}
