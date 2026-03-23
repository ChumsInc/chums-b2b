import type {B2BCartHeader, ShipToAddress} from "chums-types/b2b";
import ShipToSelect from "@/components/customer/common/ShipToSelect.tsx";
import TextField from "@mui/material/TextField";
import {addressFromShipToAddress, multiLineAddress} from "@/ducks/customer/utils.ts";
import Stack from "@mui/material/Stack";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";
import {cartProgress} from "@/utils/cart.ts";

export default function CartHeaderShipTo() {
    const {value, updateValue} = useEditorContext<B2BCartHeader>()
    const {status, setProgress} = useCartCheckout();
    const addressValue = multiLineAddress(addressFromShipToAddress(value), true).join('\n')

    const changeHandler = (shipToCode: string | null, address: ShipToAddress | null) => {
        if (!address) {
            updateValue({shipToCode: shipToCode});
            setProgress(cartProgress.cart);
            return;
        }
        updateValue({shipToCode: shipToCode, ...address});
        setProgress(cartProgress.cart);

    }
    return (
        <Stack spacing={2} direction="column">
            <ShipToSelect value={value?.shipToCode ?? ''}
                          disabled={status !== 'idle'}
                          defaultName="Default Address"
                          onChange={changeHandler}/>
            <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                       value={addressValue}
                       slotProps={{
                           htmlInput: {readOnly: true},
                       }}/>
        </Stack>
    )
}
