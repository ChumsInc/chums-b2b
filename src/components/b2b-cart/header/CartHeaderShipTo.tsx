import type {B2BCartHeader} from "@/types/cart/cart-header";
import ShipToSelect from "@/components/customer/common/ShipToSelect.tsx";
import TextField from "@mui/material/TextField";
import {addressFromShipToAddress, multiLineAddress} from "@/ducks/customer/utils.ts";
import Stack from "@mui/material/Stack";
import type {ShipToAddress} from "chums-types/b2b";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";

export interface CartHeaderShipToProps {
    cartHeader: B2BCartHeader | null;
    onChangeShipTo: (value: string | null, address: ShipToAddress | null) => void;
}

export default function CartHeaderShipTo({cartHeader, onChangeShipTo}: CartHeaderShipToProps) {
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartHeader?.id ?? -1));
    if (!cartHeader) {
        return null;
    }
    const address = multiLineAddress(addressFromShipToAddress(cartHeader), true).join('\n')
    return (
        <Stack spacing={2} direction="column">
            <ShipToSelect value={cartHeader?.shipToCode ?? ''}
                          disabled={loadingStatus !== 'idle'}
                          defaultName="Default Address"
                          onChange={onChangeShipTo}/>
            <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                       value={address}
                       slotProps={{
                           htmlInput: {readOnly: true},
                       }}/>
        </Stack>
    )
}
