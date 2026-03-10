import {useAddToCart} from "@/components/b2b-cart/add-to-cart/AddToCartContext.tsx";
import ShipToSelect from "@/components/customer/common/ShipToSelect";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CartNameInput from "./CartNameInput";
import AddToCartButton from "./AddToCartButton";
import CartSelect from "@/components/b2b-cart/add-to-cart/CartSelect";
import CartQuantityInput from "@/components/b2b-cart/CartQuantityInput.tsx";
import Box from "@mui/material/Box";


export interface AddToCartUIProps {
    excludeCartId?: number;
    disabled?: boolean;
    unitOfMeasure?: string;
    loading?: boolean;
    onDone?: () => void;
}

export default function AddToCartUI({excludeCartId, disabled, unitOfMeasure, loading, onDone}: AddToCartUIProps) {
    const {addToCart, cartId, shipToCode, setShipToCode, quantity, setQuantity, status} = useAddToCart();

    const addToCartHandler = () => {
        addToCart();
        if (onDone) {
            onDone();
        }
    }
    return (
        <form action={addToCartHandler}>
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                    <CartSelect required excludeCartId={excludeCartId}/>
                </Stack>
                {!cartId && loading && (
                    <LinearProgress variant="indeterminate" aria-label="Loading Carts"/>
                )}
                {(!cartId && !loading) && (
                    <Stack spacing={2} direction={{xs: "column", md: "row"}}>
                        <Box sx={{width: '50%'}}>
                            <CartNameInput required
                                           fullWidth
                                           helperText="Please name your cart."/>

                        </Box>
                        <Box sx={{width: '50%'}}>
                            <ShipToSelect value={shipToCode} onChange={setShipToCode}/>
                        </Box>
                    </Stack>
                )}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <CartQuantityInput quantity={quantity} onChange={setQuantity}
                                       unitOfMeasure={unitOfMeasure ?? 'EA'}
                                       disabled={disabled} required/>
                    <AddToCartButton disabled={disabled || !quantity || status !== 'idle'}/>
                </Stack>
                {status !== 'idle' && <LinearProgress variant="indeterminate"/>}
            </Stack>
        </form>
    )
}
