import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import type {B2BCartHeader} from "chums-types/b2b";
import Stack from "@mui/material/Stack";
import {cartProgress} from "@/utils/cart.ts";
import Alert from "@mui/material/Alert";
import DeleteCartButton from "@/components/b2b-cart/header/DeleteCartButton.tsx";
import Button from "@mui/material/Button";
import SendEmailButton from "@/components/b2b-cart/header/SendEmailButton.tsx";
import CheckoutButton from "@/components/b2b-cart/header/CheckoutButton.tsx";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice.ts";
import {loadCart, saveCart} from "@/ducks/carts/actions.ts";
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";
import useCustomer from "@/hooks/customer/useCustomer.ts";

export interface CartActionButtonsProps {
    detailChanged?: boolean;
    onSubmit?: () => void;
}

export default function CartActionButtons({
                                              detailChanged,
                                              onSubmit
                                          }: CartActionButtonsProps) {
    const {customerKey} = useCustomer()
    const {reloadCart, progress} = useCartCheckout();
    const {value, changed} = useEditorContext<B2BCartHeader>();
    const dispatch = useAppDispatch();
    const currentCartId = useAppSelector(selectActiveCartId);
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, currentCartId));

    const saveCartHandler = async () => {
        if (!customerKey) {
            return;
        }
        dispatch(saveCart({customerKey, cartId: value.id, body: value}));
    }

    const setCurrentCartHandler = () => {
        if (!customerKey) {
            return;
        }
        dispatch(loadCart({customerKey, cartId: value.id}))
    }

    return (
        <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between">
            <Stack sx={{flex: '1 1 auto'}}>
                {(detailChanged || changed) && progress === cartProgress.cart && (
                    <Alert severity="warning">Don&apos;t forget to save your changes!</Alert>
                )}
            </Stack>
            <Stack spacing={3} direction={{sm: 'column', md: 'row'}} sx={{justifyContent: 'flex-end'}}>
                <DeleteCartButton customerKey={customerKey} cartId={value.id}
                                  disabled={loadingStatus !== 'idle' || changed}>
                    Delete Cart
                </DeleteCartButton>

                <Button type="button" variant="text" onClick={reloadCart} disabled={loadingStatus !== 'idle'}>
                    {detailChanged || changed ? 'Cancel Changes' : 'Reload'}
                </Button>

                <Button type="button"
                        variant={(detailChanged || changed) && progress === cartProgress.cart ? 'contained' : "text"}
                        color={(detailChanged || changed) ? 'warning' : 'primary'}
                        onClick={saveCartHandler}
                        disabled={loadingStatus !== 'idle' || (progress !== cartProgress.cart && !detailChanged)}>
                    Save Cart
                </Button>
                <SendEmailButton cartId={value.id}
                                 disabled={progress !== cartProgress.cart || detailChanged}>
                    Send Email
                </SendEmailButton>
                <CheckoutButton progress={progress} onClick={onSubmit}
                                disabled={loadingStatus !== 'idle' || detailChanged}/>
                {value.id !== currentCartId && (
                    <Button type="button" variant="contained" disabled={loadingStatus !== 'idle'}
                            onClick={setCurrentCartHandler}>
                        Set Current Cart
                    </Button>
                )}
            </Stack>
        </Stack>
    )

}
