import type {CartProgress, Editable} from "chums-types/b2b";
import type {B2BCartHeader} from "@/types/cart/cart-header";
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
import {useAppSelector} from "@/app/hooks.ts";
import {selectNextShipDate} from "@/ducks/carts/activeCartSlice.ts";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";
import {eventChangeHandler, valueChangeHandler} from "@/components/b2b-cart/header/cartHeaderUtils.ts";
import type {RefObject} from "react";

export interface CartHeaderDeliveryProps {
    progress: CartProgress;
    cartHeader: B2BCartHeader | null;
    shipDateRef: RefObject<HTMLInputElement | null>;
    shipMethodRef: RefObject<HTMLDivElement | null>;
    onChange: (arg: Partial<B2BCartHeader & Editable>) => void;
}

export default function CartHeaderDelivery({
                                               progress,
                                               cartHeader,
                                               shipDateRef,
                                               shipMethodRef,
                                               onChange
                                           }: CartHeaderDeliveryProps) {
    const nextShipDate = useAppSelector(selectNextShipDate);
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartHeader?.id ?? -1));

    if (!cartHeader) {
        return null;
    }
    return (
        <Collapse in={progress >= cartProgress.delivery} collapsedSize={0}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                    <ShipDateInput value={cartHeader?.shipExpireDate ?? nextShipDate}
                                   disabled={loadingStatus !== 'idle'}
                                   error={!cartHeader?.shipExpireDate || !dayjs(cartHeader.shipExpireDate).isValid() || dayjs(cartHeader?.shipExpireDate).isBefore(nextShipDate)}
                                   onChange={valueChangeHandler('shipExpireDate', onChange)}
                                   inputProps={{required: true}} ref={shipDateRef}/>
                    <FormControl variant="filled" fullWidth>
                        <FormControlLabel control={
                            <Checkbox checked={cartHeader?.CancelReasonCode === 'HOLD'}
                                      onChange={eventChangeHandler('CancelReasonCode', onChange)}/>
                        } label="Hold for Ship Date"/>
                    </FormControl>
                </Stack>
                <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                    <ShippingMethodSelect value={cartHeader?.shipVia ?? ''} required
                                          disabled={loadingStatus !== 'idle'}
                                          error={!cartHeader?.shipVia}
                                          ref={shipMethodRef}
                                          onChange={valueChangeHandler('shipVia', onChange)}/>
                    <CustomerShippingAccountControl shipVia={cartHeader?.shipVia}/>
                </Stack>
            </Stack>
        </Collapse>
    )
}
