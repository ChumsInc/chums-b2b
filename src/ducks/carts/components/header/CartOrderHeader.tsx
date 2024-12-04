import React, {ChangeEvent, useCallback, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {addressFromShipToAddress, multiLineAddress} from "@ducks/customer/utils";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {Editable, ShipToAddress} from "b2b-types";
import CustomerShippingAccountControl from "./CustomerShippingAccountControl";
import {CartProgress,} from "@typeDefs/cart/cart-utils";
import {
    cartProgress_Cart,
    cartProgress_Confirm,
    cartProgress_Delivery,
    cartProgress_Payment,
    nextCartProgress
} from "@utils/cart";
import ShipDateInput from "./ShipDateInput";
import {minShipDate, nextShipDate} from "@utils/orders";
import ShippingMethodSelect from "@ducks/carts/components/header/ShippingMethodSelect";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import ShipToSelect from "@ducks/customer/components/ShipToSelect";
import {promoteCart} from "@ducks/cart/actions";
import Alert from "@mui/material/Alert";
import {useMatch, useNavigate} from "react-router";
import {generatePath} from "react-router-dom";
import AlertList from "@ducks/alerts/AlertList";
import SendEmailButton from "@ducks/carts/components/header/SendEmailButton";
import ItemAutocomplete from "@ducks/item-lookup/ItemAutocomplete";
import Divider from "@mui/material/Divider";
import Decimal from "decimal.js";
import {sendGtagEvent} from "@api/gtag";
import {selectSOLoading} from "@ducks/sales-order/selectors";
import TextField from "@mui/material/TextField";
import Collapse from '@mui/material/Collapse';
import Button from "@mui/material/Button";
import {selectActiveCartId, selectCartShippingAccount} from "@ducks/carts/selectors";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {loadCart, processCart, saveCart} from "@ducks/carts/actions";
import CartPaymentSelect from "@ducks/carts/components/header/CartPaymentSelect";
import CartCheckoutProgress from "@ducks/carts/components/header/CartCheckoutProgress";
import DeleteCartButton from "@ducks/carts/components/header/DeleteCartButton";
import CheckoutButton from "@ducks/carts/components/header/CheckoutButton";
import CartCommentInput from "@ducks/carts/components/header/CartCommentInput";
import {selectCustomerKey} from "@ducks/customer/selectors";
import {
    selectCartDetailById,
    selectCartHasChanges,
    selectCartHeaderById,
    selectCartStatusById
} from "@ducks/carts/selectors";
import LinearProgress from "@mui/material/LinearProgress";
import {CREDIT_CARD_PAYMENT_TYPES} from "@constants/account";


export default function CartOrderHeader() {
    const dispatch = useAppDispatch();
    const customerKey = useSelector(selectCustomerKey);
    const currentCartId = useAppSelector(selectActiveCartId);
    const header = useAppSelector((state) => selectCartHeaderById(state, currentCartId));
    const detail = useAppSelector((state) => selectCartDetailById(state, currentCartId));
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, currentCartId));
    const loading = useAppSelector(selectSOLoading);
    const shipDateRef = useRef<HTMLInputElement | null>(null);
    const shipMethodRef = useRef<HTMLDivElement | null>(null);
    const paymentMethodRef = useRef<HTMLDivElement | null>(null);
    const customerPORef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const detailChanged = useAppSelector((state) => selectCartHasChanges(state, currentCartId));
    const shippingAccount = useSelector(selectCartShippingAccount);

    const [cartHeader, setCartHeader] = useState<(B2BCartHeader & Editable) | null>(header);
    const [cartProgress, setCartProgress] = useState<CartProgress>(cartProgress_Cart);

    const promoteCart = useCallback(async () => {
        if (!cartHeader) {
            return;
        }
        const response = await dispatch(processCart(cartHeader));
        console.log('promoteCart', response);
        // navigate(generatePath('/account/:customerSlug/orders', {
        //     customerSlug: customerKey,
        // }), {replace: true});

    }, [dispatch, cartHeader, shippingAccount, customerKey, navigate])

    useEffect(() => {
        if (loading) {
            setCartProgress(cartProgress_Cart);
        }
    }, [loading]);

    const validateForm = (cartProgress: CartProgress): CartProgress => {
        if (!cartHeader) {
            return cartProgress_Cart;
        }
        if (cartProgress >= cartProgress_Cart) {
            const shipExpireDate = dayjs(cartHeader.shipExpireDate);
            if (!cartHeader.shipExpireDate || !shipExpireDate.isValid() || shipExpireDate.isBefore(minShipDate())) {
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
        setCartHeader({...header, shipExpireDate: nextShipDate()});
    }, [header]);

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
        const gtagValue = new Decimal(cartHeader.subTotalAmt).toNumber();
        if (cartProgress < cartProgress_Confirm) {
            const next = validateForm(cartProgress);
            const gtagItems = detail.map(item => ({
                item_id: item.itemCode,
                item_name: item.itemCodeDesc ?? item.itemCode
            }));
            switch (next) {
                case cartProgress_Delivery:
                    sendGtagEvent(
                        'begin_checkout',
                        {currency: "USD", value: gtagValue, items: gtagItems});
                    break;
                case cartProgress_Payment:
                    sendGtagEvent(
                        'add_shipping_info',
                        {currency: "USD", value: gtagValue, shipping_tier: cartHeader.shipVia, items: gtagItems})
                    break;
                case cartProgress_Confirm:
                    sendGtagEvent(
                        'add_payment_info',
                        {currency: "USD", value: gtagValue, payment_type: cartHeader.PaymentType, items: gtagItems})
                    break;
            }
            setCartProgress(next);
            return;
        }
        sendGtagEvent('purchase', {
            currency: "USD",
            value: gtagValue,
            transaction_id: cartHeader.salesOrderNo ?? cartHeader.id.toString(),
            items: detail.filter(item => item.itemType !== '4').map(item => ({
                item_id: item.itemCode,
                item_name: item.itemCodeDesc ?? item.itemCode,
                price: +item.unitPrice,
                quantity: +item.quantityOrdered,
            }))
        })
        await promoteCart();
    }

    return (
        <Box component="div">
            <Grid container spacing={2}>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            <TextField label="Cart Created" type="date" fullWidth variant="filled" size="small"
                                       value={orderDate} placeholder=""
                                       inputProps={{readOnly: true}}/>
                            <TextField label="Cart Expires" type="date" size="small" variant="filled" fullWidth
                                       value={dayjs(header?.shipExpireDate).format('YYYY-MM-DD')}
                                       inputProps={{readOnly: true}}/>
                        </Stack>
                        <TextField label="Cart Name" type="text" fullWidth variant="filled" size="small"
                                   value={cartHeader?.customerPONo ?? ''} required
                                   onChange={changeHandler("customerPONo")}
                                   inputProps={{ref: customerPORef, maxLength: 30}}/>
                        <TextField label="Promo Code" type="text" fullWidth inputProps={{maxLength: 30}}
                                   value={cartHeader?.promoCode ?? ''} onChange={changeHandler('promoCode')}
                                   variant="filled" size="small"/>
                    </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <ShipToSelect value={cartHeader?.shipToCode ?? ''}
                                      disabled={loadingStatus !== 'idle'}
                                      defaultName="Default Address"
                                      onChange={shipToChangeHandler}/>
                        <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                                   value={multiLineAddress(addressFromShipToAddress(cartHeader), true).join('\n')}
                                   inputProps={{readOnly: true}}/>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid xs={12} lg={6}>
                    <Collapse in={cartProgress >= cartProgress_Delivery} collapsedSize={0}>
                        <Stack spacing={2} direction="column">
                            <ShipDateInput value={cartHeader?.shipExpireDate ?? ''}
                                           disabled={loadingStatus !== 'idle'}
                                           error={!cartHeader?.shipExpireDate || !dayjs(cartHeader.shipExpireDate).isValid() || dayjs(cartHeader?.shipExpireDate).isBefore(nextShipDate())}
                                           onChange={valueChangeHandler('shipExpireDate')}
                                           inputProps={{required: true}} ref={shipDateRef}/>
                            <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                                <ShippingMethodSelect value={cartHeader?.shipVia ?? ''} required
                                                      disabled={loadingStatus !== 'idle'}
                                                      error={!cartHeader?.shipVia}
                                                      ref={shipMethodRef}
                                                      onChange={valueChangeHandler('shipVia')}/>
                                <CustomerShippingAccountControl/>
                            </Stack>
                        </Stack>
                    </Collapse>
                </Grid>
                <Grid xs={12} lg={6}>
                    <Collapse in={cartProgress >= cartProgress_Payment} collapsedSize={0}>
                        <Stack spacing={2} direction="column">
                            <CartPaymentSelect value={cartHeader?.PaymentType ?? ''} error={!cartHeader?.PaymentType}
                                               ref={paymentMethodRef} required
                                               disabled={loadingStatus !== 'idle'}
                                               onChange={valueChangeHandler('PaymentType')}/>
                            <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                                       inputProps={{maxLength: 30}} onChange={changeHandler('customerPONo')}
                                       disabled={loadingStatus !== 'idle'}
                                       error={!cartHeader.customerPONo}
                                       value={cartHeader?.customerPONo ?? ''} required/>
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
                <ItemAutocomplete salesOrderNo={header.salesOrderNo}/>
                <CartCommentInput cartId={header.id}/>
            </Stack>

        </Box>
    )
}
