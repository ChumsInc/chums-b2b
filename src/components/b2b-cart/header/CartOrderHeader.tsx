import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {generatePath, useNavigate} from "react-router";
import AlertList from "@/components/alerts/AlertList";
import type {B2BCartHeader, CartProgress} from "chums-types/b2b";
import {processCart} from "@/ducks/carts/actions";
import CartCheckoutProgress from "@/components/b2b-cart/header/CartCheckoutProgress";
import LinearProgress from "@mui/material/LinearProgress";
import {ga4AddPaymentInfo, ga4AddShippingInfo, ga4BeginCheckout, ga4Purchase} from "@/utils/ga4/cart";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {selectCartHasChanges} from "@/ducks/carts/cartDetailSlice";
import {cartProgress, nextCartProgress} from "@/utils/cart.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {useCallback, useEffect, useRef} from "react";
import dayjs from "dayjs";
import CartActionButtons from "@/components/b2b-cart/header/CartActionButtons.tsx";
import CartHeaderDelivery from "@/components/b2b-cart/header/CartHeaderDelivery.tsx";
import CartHeaderPayment from "@/components/b2b-cart/header/CartHeaderPayment.tsx";
import CartHeaderInfo from "@/components/b2b-cart/header/CartHeaderInfo.tsx";
import CartHeaderShipTo from "@/components/b2b-cart/header/CartHeaderShipTo.tsx";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";


export default function CartOrderHeader() {
    const dispatch = useAppDispatch();
    const {customerKey} = useCustomer();
    const {cartDetail, progress, setProgress, status, nextShipDate, shipDate} = useCartCheckout();
    const {value, updateValue} = useEditorContext<B2BCartHeader>()
    const currentCartId = useAppSelector(selectActiveCartId);
    const shipDateRef = useRef<HTMLInputElement | null>(null);
    const shipMethodRef = useRef<HTMLDivElement | null>(null);
    const paymentMethodRef = useRef<HTMLDivElement | null>(null);
    const customerPORef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const detailChanged = useAppSelector((state) => selectCartHasChanges(state, currentCartId));

    const promoteCart = useCallback(async () => {
        if (!shipDate) {
            return;
        }
        const response = await dispatch(processCart({
            ...value,
            shipExpireDate: shipDate
        }));
        if (response.payload && typeof response.payload === 'string') {
            navigate(generatePath('/account/:customerSlug/orders/:salesOrderNo', {
                customerSlug: customerKey,
                salesOrderNo: response.payload,
            }), {replace: true});
            return;
        }
        navigate(generatePath('/account/:customerSlug/carts', {
            customerSlug: customerKey,
        }), {replace: true});
    }, [dispatch, value, customerKey, navigate, shipDate])

    const validateForm = (_progress: CartProgress): CartProgress => {
        if (_progress >= cartProgress.cart) {
            const shipExpireDate = dayjs(value.shipExpireDate);
            if (!value.shipExpireDate || !shipExpireDate.isValid() || shipExpireDate.isBefore(nextShipDate)) {
                shipDateRef.current?.focus();
                return cartProgress.delivery;
            }
            if (!value.shipVia) {
                shipMethodRef.current?.focus();
                return cartProgress.delivery;
            }
        }
        if (_progress >= cartProgress.delivery) {
            if (!value.PaymentType) {
                paymentMethodRef.current?.focus();
                return cartProgress.payment;
            }
            if (!value.customerPONo) {
                customerPORef.current?.focus();
                return cartProgress.payment;
            }
        }
        return nextCartProgress(_progress);
    }

    useEffect(() => {
        // @TODO: migrate the cart expire date away from the Ship Date field
        const _nextShipDate = nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD')
        if (dayjs(_nextShipDate).startOf('day').isAfter(value.shipExpireDate ?? _nextShipDate)) {
            updateValue({shipExpireDate: _nextShipDate});
        }
    }, [nextShipDate, value, updateValue]);

    const changeHandler = (arg: Partial<B2BCartHeader>) => {
        updateValue(arg);
    }

    const submitHandler = async () => {
        if (progress < cartProgress.confirm) {
            const next = validateForm(progress);
            switch (next) {
                case cartProgress.delivery:
                    ga4BeginCheckout(value, cartDetail);
                    break;
                case cartProgress.payment:
                    ga4AddShippingInfo(value, cartDetail);
                    break;
                case cartProgress.confirm:
                    ga4AddPaymentInfo(value, cartDetail);
                    break;
                // no default
            }
            setProgress(next);
            return;
        }
        ga4Purchase(value, cartDetail)
        await promoteCart();
    }

    return (
        <Box component="div">
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderInfo customerPORef={customerPORef}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderShipTo/>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderDelivery shipDateRef={shipDateRef}
                                        shipMethodRef={shipMethodRef}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderPayment cartHeader={value} progress={progress}
                                       paymentMethodRef={paymentMethodRef}
                                       onChange={changeHandler}/>
                </Grid>
            </Grid>
            <CartCheckoutProgress disabled={status !== 'idle'}/>
            <CartActionButtons detailChanged={detailChanged}
                               onSubmit={submitHandler}/>
            {status !== 'idle' && <LinearProgress variant="indeterminate"/>}
            <AlertList context={processCart.typePrefix}/>
        </Box>
    )
}
