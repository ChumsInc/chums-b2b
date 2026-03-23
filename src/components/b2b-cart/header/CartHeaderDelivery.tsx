import type {B2BCartHeader} from "chums-types/b2b";
import {cartProgress} from "@/utils/cart.ts";
import Stack from "@mui/material/Stack";
import ShipDateInput from "@/components/b2b-cart/header/ShipDateInput.tsx";
import dayjs from "dayjs";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ShippingMethodSelect from "@/components/b2b-cart/header/ShippingMethodSelect.tsx";
import CustomerShippingAccountControl from "@/components/b2b-cart/header/CustomerShippingAccountControl.tsx";
import Collapse from "@mui/material/Collapse";
import {eventChangeHandler, valueChangeHandler} from "@/components/b2b-cart/header/cartHeaderUtils.ts";
import type {RefObject} from "react";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";

export interface CartHeaderDeliveryProps {
    shipDateRef: RefObject<HTMLInputElement | null>;
    shipMethodRef: RefObject<HTMLDivElement | null>;
}

export default function CartHeaderDelivery({
                                               shipDateRef,
                                               shipMethodRef,
                                           }: CartHeaderDeliveryProps) {
    const {value, updateValue} = useEditorContext<B2BCartHeader>()
    const {nextShipDate, status, progress, shipDate, setShipDate} = useCartCheckout();

    return (
        <Collapse in={progress >= cartProgress.delivery} collapsedSize={0}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                    <ShipDateInput value={shipDate ?? nextShipDate}
                                   disabled={status !== 'idle'}
                                   error={!shipDate || !dayjs(shipDate).isValid() || dayjs(shipDate).isBefore(nextShipDate)}
                                   onChange={setShipDate}
                                   inputProps={{required: true}} ref={shipDateRef}/>
                    <FormControl variant="filled" fullWidth>
                        <FormControlLabel control={
                            <Checkbox checked={value?.CancelReasonCode === 'HOLD'}
                                      onChange={eventChangeHandler('CancelReasonCode', updateValue)}/>
                        } label="Hold for Ship Date"/>
                    </FormControl>
                </Stack>
                <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                    <ShippingMethodSelect value={value?.shipVia ?? ''} required
                                          disabled={status !== 'idle'}
                                          error={!value?.shipVia}
                                          ref={shipMethodRef}
                                          onChange={valueChangeHandler('shipVia', updateValue)}/>
                    <CustomerShippingAccountControl shipVia={value?.shipVia}/>
                </Stack>
            </Stack>
        </Collapse>
    )
}
