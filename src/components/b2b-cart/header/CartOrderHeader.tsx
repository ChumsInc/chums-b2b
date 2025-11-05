'use client';

import {type ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {addressFromShipToAddress, multiLineAddress} from "@/ducks/customer/utils";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import type {Editable, ShipToAddress} from "chums-types/b2b";
import CustomerShippingAccountControl from "./CustomerShippingAccountControl";
import type {CartProgress} from "@/types/cart/cart-utils";
import {
    cartProgress_Cart,
    cartProgress_Confirm,
    cartProgress_Delivery,
    cartProgress_Payment,
    nextCartProgress
} from "@/utils/cart";
import ShipDateInput from "./ShipDateInput";
import ShippingMethodSelect from "@/components/b2b-cart/header/ShippingMethodSelect";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import ShipToSelect from "@/components/customer/common/ShipToSelect";
import Alert from "@mui/material/Alert";
import {generatePath, useNavigate} from "react-router";
import AlertList from "@/components/alerts/AlertList";
import SendEmailButton from "@/components/b2b-cart/header/SendEmailButton";
import ItemAutocomplete from "@/ducks/item-lookup/ItemAutocomplete";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Collapse from '@mui/material/Collapse';
import Button from "@mui/material/Button";
import {selectCartHeaderById,} from "@/ducks/carts/cartHeadersSlice";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import {loadCart, loadNextShipDate, processCart, saveCart} from "@/ducks/carts/actions";
import CartPaymentSelect from "@/components/b2b-cart/header/CartPaymentSelect";
import CartCheckoutProgress from "@/components/b2b-cart/header/CartCheckoutProgress";
import DeleteCartButton from "@/components/b2b-cart/header/DeleteCartButton";
import CheckoutButton from "@/components/b2b-cart/header/CheckoutButton";
import CartCommentInput from "@/components/b2b-cart/header/CartCommentInput";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {ga4AddPaymentInfo, ga4AddShippingInfo, ga4BeginCheckout, ga4Purchase} from "@/utils/ga4/cart";
import {selectActiveCartId, selectCartShippingAccount, selectNextShipDate} from "@/ducks/carts/activeCartSlice";
import {selectCartDetailById, selectCartHasChanges} from "@/ducks/carts/cartDetailSlice";


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

    const [cartHeader, setCartHeader] = useState<(B2BCartHeader & Editable) | null>(header);
    const [cartProgress, setCartProgress] = useState<CartProgress>(cartProgress_Cart);

    const promoteCart = useCallback(async () => {
        if (!cartHeader) {
            return;
        }
        const response = await dispatch(processCart(cartHeader));
        console.log('promoteCart', response);
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
            setCartProgress(cartProgress_Cart);
        }
    }, [loadingStatus]);

    useEffect(() => {
        dispatch(loadNextShipDate());
    }, []);

    const validateForm = (cartProgress: CartProgress): CartProgress => {
        if (!cartHeader) {
            return cartProgress_Cart;
        }
        if (cartProgress >= cartProgress_Cart) {
            const shipExpireDate = dayjs(cartHeader.shipExpireDate);
            if (!cartHeader.shipExpireDate || !shipExpireDate.isValid() || shipExpireDate.isBefore(nextShipDate)) {
                shipDateRef.current?.focus();
                return cartProgress_Delivery;
            }
            if (!cartHeader.shipVia) {
                shipMethodRef.current?.focus();
                return cartProgress_Delivery;
            }
        }
        if (cartProgress >= cartProgress_Delivery) {
            if (!cartHeader.PaymentType) {
                paymentMethodRef.current?.focus();
                return cartProgress_Payment;
            }
            if (!cartHeader.customerPONo) {
                customerPORef.current?.focus();
                return cartProgress_Payment;
            }
        }
        return nextCartProgress(cartProgress);
    }

    useEffect(() => {
        if (!header) {
            setCartHeader(null);
            return;
        }
        setCartHeader({...header, shipExpireDate: nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD')});
    }, [header, nextShipDate]);

    if (!customerKey || !header || !cartHeader) {
        return null;
    }


    const orderDate = dayjs(cartHeader.dateCreated).format('YYYY-MM-DD');

    const changeHandler = (field: keyof B2BCartHeader) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'customerPONo':
            case 'promoCode':
                setCartHeader({...cartHeader, [field]: ev.target.value, changed: true});
                return;
            case 'CancelReasonCode':
                setCartHeader({...cartHeader, [field]: ev.target.checked ? 'HOLD' : '', changed: true});
                return;

        }
    }

    const valueChangeHandler = (field: keyof B2BCartHeader) => (value: string | null) => {
        switch (field) {
            case 'shipExpireDate':
                if (dayjs(value).isValid()) {
                    switch (dayjs(value).day()) {
                        case 0:
                            setCartHeader({
                                ...cartHeader,
                                [field]: dayjs(value).add(1, 'day').toISOString(),
                                changed: true
                            });
                            return;
                        case 6:
                            setCartHeader({
                                ...cartHeader,
                                [field]: dayjs(value).add(2, 'day').toISOString(),
                                changed: true
                            });
                            return;
                    }
                }
                setCartHeader({...cartHeader, [field]: value ?? '', changed: true});
                return;
            case 'shipVia':
            case 'PaymentType':
                setCartHeader({...cartHeader, [field]: value ?? '', changed: true});
        }
    }

    const shipToChangeHandler = (value: string | null, address: ShipToAddress | null) => {
        if (!cartHeader) {
            return;
        }
        if (!address) {
            setCartHeader({...cartHeader, shipToCode: value, changed: true});
            setCartProgress(cartProgress_Cart);
            return;
        }
        setCartHeader({...cartHeader, shipToCode: value, ...address, changed: true});
        setCartProgress(cartProgress_Cart);
    }

    const setCurrentCartHandler = () => {
        if (!customerKey || !header) {
            return;
        }
        dispatch(loadCart({customerKey, cartId: header.id}))
    }

    const reloadHandler = () => {
        setCartProgress(cartProgress_Cart);
        if (!customerKey || !header) {
            return;
        }
        dispatch(loadCart({customerKey, cartId: header?.id}));
        dispatch(loadNextShipDate());
    }

    const saveCartHandler = async () => {
        if (!customerKey || !cartHeader) {
            return;
        }
        dispatch(saveCart({customerKey, cartId: cartHeader.id, body: cartHeader}));
    }

    const submitHandler = async () => {
        if (!cartHeader) {
            return;
        }
        if (cartProgress < cartProgress_Confirm) {
            const next = validateForm(cartProgress);
            console.log('submitHandler', next);
            switch (next) {
                case cartProgress_Delivery:
                    ga4BeginCheckout(header, detail);

                    break;
                case cartProgress_Payment:
                    ga4AddShippingInfo(header, detail);
                    break;
                case cartProgress_Confirm:
                    ga4AddPaymentInfo(header, detail);
                    break;
            }
            setCartProgress(next);
            return;
        }
        ga4Purchase(header, detail)
        await promoteCart();
    }

    return (
        <Box component="div">
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack spacing={2} direction="column">
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            <TextField label="Cart Created" type="date" fullWidth variant="filled" size="small"
                                       value={orderDate} placeholder=""
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                            <TextField label="Cart Expires" type="date" size="small" variant="filled" fullWidth
                                       value={dayjs(header?.shipExpireDate).format('YYYY-MM-DD')}
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                        </Stack>
                        <TextField label="Cart Name" type="text" fullWidth variant="filled" size="small"
                                   value={cartHeader?.customerPONo ?? ''} required
                                   onChange={changeHandler("customerPONo")}
                                   slotProps={{
                                       htmlInput: {ref: customerPORef, maxLength: 30}
                                   }}/>
                        <TextField label="Promo Code" type="text" fullWidth
                                   slotProps={{
                                       htmlInput: {maxLength: 30}
                                   }}
                                   value={cartHeader?.promoCode ?? ''} onChange={changeHandler('promoCode')}
                                   variant="filled" size="small"/>
                    </Stack>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack spacing={2} direction="column">
                        <ShipToSelect value={cartHeader?.shipToCode ?? ''}
                                      disabled={loadingStatus !== 'idle'}
                                      defaultName="Default Address"
                                      onChange={shipToChangeHandler}/>
                        <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                                   value={multiLineAddress(addressFromShipToAddress(cartHeader), true).join('\n')}
                                   slotProps={{
                                       htmlInput: {readOnly: true},
                                   }}/>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{mb: 1}}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Collapse in={cartProgress >= cartProgress_Delivery} collapsedSize={0}>
                        <Stack spacing={2} direction="column">
                            <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                                <ShipDateInput value={cartHeader?.shipExpireDate ?? nextShipDate}
                                               disabled={loadingStatus !== 'idle'}
                                               error={!cartHeader?.shipExpireDate || !dayjs(cartHeader.shipExpireDate).isValid() || dayjs(cartHeader?.shipExpireDate).isBefore(nextShipDate)}
                                               onChange={valueChangeHandler('shipExpireDate')}
                                               inputProps={{required: true}} ref={shipDateRef}/>
                                <FormControl variant="filled" fullWidth>
                                    <FormControlLabel control={
                                        <Checkbox checked={cartHeader?.CancelReasonCode === 'HOLD'}
                                                  onChange={changeHandler('CancelReasonCode')}/>
                                    } label="Hold for Ship Date"/>
                                </FormControl>
                            </Stack>
                            <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                                <ShippingMethodSelect value={cartHeader?.shipVia ?? ''} required
                                                      disabled={loadingStatus !== 'idle'}
                                                      error={!cartHeader?.shipVia}
                                                      ref={shipMethodRef}
                                                      onChange={valueChangeHandler('shipVia')}/>
                                <CustomerShippingAccountControl shipVia={cartHeader?.shipVia}/>
                            </Stack>
                        </Stack>
                    </Collapse>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Collapse in={cartProgress >= cartProgress_Payment} collapsedSize={0}>
                        <Stack spacing={2} direction="column">
                            <CartPaymentSelect value={cartHeader?.PaymentType ?? ''} error={!cartHeader?.PaymentType}
                                               ref={paymentMethodRef} required
                                               disabled={loadingStatus !== 'idle'}
                                               onChange={valueChangeHandler('PaymentType')}/>
                            <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                                       value={cartHeader?.customerPONo ?? ''} onChange={changeHandler('customerPONo')}
                                       slotProps={{
                                           htmlInput: {maxLength: 30}
                                       }}
                                       disabled={loadingStatus !== 'idle'}
                                       error={!cartHeader.customerPONo}
                                       required/>
                        </Stack>
                    </Collapse>
                </Grid>
            </Grid>
            <CartCheckoutProgress current={cartProgress} disabled={loadingStatus !== 'idle'}
                                  onChange={setCartProgress}/>
            <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between">
                <Stack sx={{flex: '1 1 auto'}}>
                    {(detailChanged || cartHeader?.changed) && cartProgress === cartProgress_Cart && (
                        <Alert severity="warning">Don&apos;t forget to save your changes!</Alert>
                    )}
                </Stack>
                <Stack spacing={3} direction={{sm: 'column', md: 'row'}} sx={{justifyContent: 'flex-end'}}>
                    <DeleteCartButton customerKey={customerKey} cartId={cartHeader.id}
                                      disabled={loadingStatus !== 'idle' || cartHeader?.changed}>
                        Delete Cart
                    </DeleteCartButton>

                    <Button type="button" variant="text" onClick={reloadHandler} disabled={loadingStatus !== 'idle'}>
                        {detailChanged || cartHeader?.changed ? 'Cancel Changes' : 'Reload'}
                    </Button>

                    <Button type="button"
                            variant={(detailChanged || cartHeader?.changed) && cartProgress === cartProgress_Cart ? 'contained' : "text"}
                            color={(detailChanged || cartHeader?.changed) ? 'warning' : 'primary'}
                            onClick={saveCartHandler}
                            disabled={loadingStatus !== 'idle' || (cartProgress !== cartProgress_Cart && !detailChanged)}>
                        Save Cart
                    </Button>
                    <SendEmailButton cartId={cartHeader.id}
                                     disabled={cartProgress !== cartProgress_Cart || detailChanged}>
                        Send Email
                    </SendEmailButton>
                    <CheckoutButton cartProgress={cartProgress} onClick={submitHandler}
                                    disabled={loadingStatus !== 'idle' || detailChanged}/>
                    {cartHeader.id !== currentCartId && (
                        <Button type="button" variant="contained" disabled={loadingStatus !== 'idle'}
                                onClick={setCurrentCartHandler}>
                            Set Current Cart
                        </Button>
                    )}
                </Stack>
            </Stack>
            {loadingStatus !== 'idle' && <LinearProgress variant="indeterminate"/>}
            <AlertList context={processCart.typePrefix}/>
            <hr/>
            <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between"
                   divider={<Divider orientation="vertical" flexItem/>}>
                <ItemAutocomplete cartId={header.id}/>
                <CartCommentInput cartId={header.id}/>
            </Stack>

        </Box>
    )
}
