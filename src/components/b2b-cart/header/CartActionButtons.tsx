import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice.ts";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import type {CartProgress} from "chums-types/b2b";
import Stack from "@mui/material/Stack";
import {cartProgress} from "@/utils/cart.ts";
import Alert from "@mui/material/Alert";
import DeleteCartButton from "@/components/b2b-cart/header/DeleteCartButton.tsx";
import Button from "@mui/material/Button";
import SendEmailButton from "@/components/b2b-cart/header/SendEmailButton.tsx";
import CheckoutButton from "@/components/b2b-cart/header/CheckoutButton.tsx";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice.ts";
import {loadCart, loadNextShipDate, saveCart} from "@/ducks/carts/actions.ts";

export interface CartActionButtonsProps {
    cartHeader: B2BCartHeader | null;
    headerChanged?: boolean;
    detailChanged?: boolean;
    progress: CartProgress;
    setProgress: (progress: CartProgress) => void;
    onSubmit?: () => void;
}

export default function CartActionButtons({
                                              cartHeader,
                                              headerChanged,
                                              detailChanged,
                                              progress,
                                              setProgress,
                                              onSubmit
                                          }: CartActionButtonsProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const currentCartId = useAppSelector(selectActiveCartId);
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, currentCartId));

    const reloadHandler = () => {
        setProgress(cartProgress.cart);
        if (!customerKey || !cartHeader?.id) {
            return;
        }
        dispatch(loadCart({customerKey, cartId: cartHeader?.id}));
        dispatch(loadNextShipDate());
    }

    const saveCartHandler = async () => {
        if (!customerKey || !cartHeader) {
            return;
        }
        dispatch(saveCart({customerKey, cartId: cartHeader.id, body: cartHeader}));
    }

    const setCurrentCartHandler = () => {
        if (!customerKey || !cartHeader) {
            return;
        }
        dispatch(loadCart({customerKey, cartId: cartHeader.id}))
    }


    if (!cartHeader) {
        return null;
    }

    return (
        <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between">
            <Stack sx={{flex: '1 1 auto'}}>
                {(detailChanged || headerChanged) && progress === cartProgress.cart && (
                    <Alert severity="warning">Don&apos;t forget to save your changes!</Alert>
                )}
            </Stack>
            <Stack spacing={3} direction={{sm: 'column', md: 'row'}} sx={{justifyContent: 'flex-end'}}>
                <DeleteCartButton customerKey={customerKey} cartId={cartHeader.id}
                                  disabled={loadingStatus !== 'idle' || headerChanged}>
                    Delete Cart
                </DeleteCartButton>

                <Button type="button" variant="text" onClick={reloadHandler} disabled={loadingStatus !== 'idle'}>
                    {detailChanged || headerChanged ? 'Cancel Changes' : 'Reload'}
                </Button>

                <Button type="button"
                        variant={(detailChanged || headerChanged) && progress === cartProgress.cart ? 'contained' : "text"}
                        color={(detailChanged || headerChanged) ? 'warning' : 'primary'}
                        onClick={saveCartHandler}
                        disabled={loadingStatus !== 'idle' || (progress !== cartProgress.cart && !detailChanged)}>
                    Save Cart
                </Button>
                <SendEmailButton cartId={cartHeader.id}
                                 disabled={progress !== cartProgress.cart || detailChanged}>
                    Send Email
                </SendEmailButton>
                <CheckoutButton progress={progress} onClick={onSubmit}
                                disabled={loadingStatus !== 'idle' || detailChanged}/>
                {cartHeader.id !== currentCartId && (
                    <Button type="button" variant="contained" disabled={loadingStatus !== 'idle'}
                            onClick={setCurrentCartHandler}>
                        Set Current Cart
                    </Button>
                )}
            </Stack>
        </Stack>
    )

}
