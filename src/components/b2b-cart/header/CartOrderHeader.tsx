import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import {generatePath, useNavigate} from "react-router";
import AlertList from "@/components/alerts/AlertList";
import {selectCartHeaderById,} from "@/ducks/carts/cartHeadersSlice";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import {loadNextShipDate, processCart} from "@/ducks/carts/actions";
import CartCheckoutProgress from "@/components/b2b-cart/header/CartCheckoutProgress";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import LinearProgress from "@mui/material/LinearProgress";
import {ga4AddPaymentInfo, ga4AddShippingInfo, ga4BeginCheckout, ga4Purchase} from "@/utils/ga4/cart";
import {selectActiveCartId, selectCartShippingAccount, selectNextShipDate} from "@/ducks/carts/activeCartSlice";
import {selectCartDetailById, selectCartHasChanges} from "@/ducks/carts/cartDetailSlice";
import {cartProgress, nextCartProgress} from "@/utils/cart.ts";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {useCallback, useEffect, useRef, useState} from "react";
import type {CartProgress, ShipToAddress} from "chums-types/b2b";
import dayjs from "dayjs";
import CartActionButtons from "@/components/b2b-cart/header/CartActionButtons.tsx";
import isEqual from 'fast-deep-equal';
import CartHeaderDelivery from "@/components/b2b-cart/header/CartHeaderDelivery.tsx";
import CartHeaderPayment from "@/components/b2b-cart/header/CartHeaderPayment.tsx";
import CartHeaderInfo from "@/components/b2b-cart/header/CartHeaderInfo.tsx";
import CartHeaderShipTo from "@/components/b2b-cart/header/CartHeaderShipTo.tsx";
import CartSkeleton from "@/components/b2b-cart/header/CartSkeleton.tsx";


export default function CartOrderHeader() {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const currentCartId = useAppSelector(selectActiveCartId);
    const header = useAppSelector((state) => selectCartHeaderById(state, currentCartId));
    const detail = useAppSelector((state) => selectCartDetailById(state, currentCartId));
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, currentCartId));
    const shipDateRef = useRef<HTMLInputElement | null>(null);
    const shipMethodRef = useRef<HTMLDivElement | null>(null);
    const paymentMethodRef = useRef<HTMLDivElement | null>(null);
    const customerPORef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const detailChanged = useAppSelector((state) => selectCartHasChanges(state, currentCartId));
    const shippingAccount = useAppSelector(selectCartShippingAccount);
    const nextShipDate = useAppSelector(selectNextShipDate)

    const [cartHeader, setCartHeader] = useState<B2BCartHeader | null>(header);
    const [progress, setProgress] = useState<CartProgress>(cartProgress.cart);

    const changed = !isEqual(cartHeader, header);

    const promoteCart = useCallback(async () => {
        if (!cartHeader) {
            return;
        }
        const response = await dispatch(processCart(cartHeader));
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
    }, [dispatch, cartHeader, shippingAccount, customerKey, navigate])

    useEffect(() => {
        if (loadingStatus !== 'idle') {
            setProgress(cartProgress.cart);
        }
    }, [loadingStatus]);

    useEffect(() => {
        dispatch(loadNextShipDate());
    }, []);

    const validateForm = (_progress: CartProgress): CartProgress => {
        if (!cartHeader) {
            return cartProgress.cart;
        }
        if (_progress >= cartProgress.cart) {
            const shipExpireDate = dayjs(cartHeader.shipExpireDate);
            if (!cartHeader.shipExpireDate || !shipExpireDate.isValid() || shipExpireDate.isBefore(nextShipDate)) {
                shipDateRef.current?.focus();
                return cartProgress.delivery;
            }
            if (!cartHeader.shipVia) {
                shipMethodRef.current?.focus();
                return cartProgress.delivery;
            }
        }
        if (_progress >= cartProgress.delivery) {
            if (!cartHeader.PaymentType) {
                paymentMethodRef.current?.focus();
                return cartProgress.payment;
            }
            if (!cartHeader.customerPONo) {
                customerPORef.current?.focus();
                return cartProgress.payment;
            }
        }
        return nextCartProgress(_progress);
    }

    useEffect(() => {
        if (!header) {
            setCartHeader(null);
            return;
        }
        // @TODO: migrate the cart expire date away from the Ship Date field
        setCartHeader(header);
        // setCartHeader({...header, shipExpireDate: nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD')});
    }, [header, nextShipDate]);

    const shipToChangeHandler = (value: string | null, address: ShipToAddress | null) => {
        if (!cartHeader) {
            return;
        }
        if (!address) {
            setCartHeader({...cartHeader, shipToCode: value});
            setProgress(cartProgress.cart);
            return;
        }
        setCartHeader({...cartHeader, shipToCode: value, ...address});
        setProgress(cartProgress.cart);
    }

    const changeHandler = (arg: Partial<B2BCartHeader>) => {
        if (!cartHeader) {
            return;
        }
        setCartHeader({...cartHeader, ...arg});
    }

    const submitHandler = async () => {
        if (!cartHeader) {
            return;
        }
        if (progress < cartProgress.confirm) {
            const next = validateForm(progress);
            switch (next) {
                case cartProgress.delivery:
                    ga4BeginCheckout(header, detail);

                    break;
                case cartProgress.payment:
                    ga4AddShippingInfo(header, detail);
                    break;
                case cartProgress.confirm:
                    ga4AddPaymentInfo(header, detail);
                    break;
                // no default
            }
            setProgress(next);
            return;
        }
        ga4Purchase(header, detail)
        await promoteCart();
    }

    if (!customerKey || !header || !cartHeader) {
        return (
            <CartSkeleton/>
        );
    }

    return (
        <Box component="div">
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderInfo cartHeader={cartHeader} customerPORef={customerPORef} onChange={changeHandler}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderShipTo cartHeader={cartHeader} onChangeShipTo={shipToChangeHandler}/>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderDelivery cartHeader={cartHeader} progress={progress}
                                        shipDateRef={shipDateRef} shipMethodRef={shipMethodRef}
                                        onChange={changeHandler}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CartHeaderPayment cartHeader={cartHeader} progress={progress}
                                       paymentMethodRef={paymentMethodRef}
                                       onChange={changeHandler}/>
                </Grid>
            </Grid>
            <CartCheckoutProgress current={progress} disabled={loadingStatus !== 'idle'}
                                  onChange={setProgress}/>
            <CartActionButtons cartHeader={cartHeader} progress={progress} setProgress={setProgress}
                               headerChanged={changed} detailChanged={detailChanged}
                               onSubmit={submitHandler}/>
            {loadingStatus !== 'idle' && <LinearProgress variant="indeterminate"/>}
            <AlertList context={processCart.typePrefix}/>


        </Box>
    )
}
