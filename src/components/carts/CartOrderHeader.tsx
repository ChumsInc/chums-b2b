import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {addressFromShipToAddress, multiLineAddress} from "@ducks/customer/utils";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {Editable, ShipToAddress} from "b2b-types";
import CustomerShippingAccountControl from "./CustomerShippingAccountControl";
import {
    CartProgress,
    cartProgress_Cart,
    cartProgress_Confirm,
    cartProgress_Delivery,
    cartProgress_Payment,
    nextCartProgress
} from "@typeDefs/cart";
import ShipDateInput from "./ShipDateInput";
import {minShipDate, nextShipDate} from "@utils/orders";
import ShippingMethodSelect from "@components/ShippingMethodSelect";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Unstable_Grid2';
import ShipToSelect from "@ducks/customer/components/ShipToSelect";
import {promoteCart} from "@ducks/cart/actions";
import Alert from "@mui/material/Alert";
import {useMatch, useNavigate} from "react-router";
import {generatePath} from "react-router-dom";
import {customerSlug} from "@utils/customer";
import AlertList from "@ducks/alerts/AlertList";
import SendEmailButton from "@ducks/open-orders/components/SendEmailButton";
import ItemAutocomplete from "@ducks/item-lookup/ItemAutocomplete";
import Divider from "@mui/material/Divider";
import Decimal from "decimal.js";
import {sendGtagEvent} from "@api/gtag";
import {selectSOLoading} from "@ducks/sales-order/selectors";
import TextField from "@mui/material/TextField";
import Collapse from '@mui/material/Collapse';
import Button from "@mui/material/Button";
import {
    selectCartDetail,
    selectCartHasChanges,
    selectCartHeader,
    selectCartId,
    selectCartStatus
} from "@ducks/b2b-cart/selectors";
import {B2BCartHeader} from "@typeDefs/carts";
import {loadCart} from "@ducks/b2b-cart/actions";
import CartPaymentSelect from "@components/carts/CartPaymentSelect";
import CartCheckoutProgress from "@components/carts/CartCheckoutProgress";
import DeleteCartButton from "@components/carts/DeleteCartButton";
import CheckoutButton from "@components/carts/CheckoutButton";
import CartCommentInput from "@components/carts/CartCommentInput";
import {selectCustomerKey} from "@ducks/customer/selectors";


export default function CartOrderHeader() {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/:orderType/:cartId');
    const customerKey = useSelector(selectCustomerKey);
    const currentCartId = useAppSelector(selectCartId);

    const header = useAppSelector(selectCartHeader);
    const detail = useAppSelector(selectCartDetail);
    const loadingStatus = useAppSelector(selectCartStatus);
    const loading = useAppSelector(selectSOLoading);
    const shipDateRef = useRef<HTMLInputElement | null>(null);
    const shipMethodRef = useRef<HTMLDivElement | null>(null);
    const paymentMethodRef = useRef<HTMLDivElement | null>(null);
    const customerPORef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const detailChanged = useAppSelector(selectCartHasChanges);

    const [cartHeader, setCartHeader] = useState<(B2BCartHeader & Editable) | null>(header);
    const [cartProgress, setCartProgress] = useState<CartProgress>(cartProgress_Cart);

    useEffect(() => {
        if (customerKey && customerKey === match?.params.customerSlug && !!match.params.cartId) {
            dispatch(loadCart({customerKey, cartId: +match.params.cartId}))
        }
    }, [match?.params.cartId, customerKey]);

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
            case 'paymentType':
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

    const saveCartHandler = () => {
        if (!customerKey || !cartHeader) {
            return;
        }
        // dispatch(saveCart(cartHeader));
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
                        {currency: "USD", value: gtagValue, payment_type: cartHeader.paymentType, items: gtagItems})
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
        // await dispatch(promoteCart(cartHeader));
        navigate(generatePath('/account/:customerSlug/orders/:salesOrderNo', {
            customerSlug: customerKey,
            salesOrderNo: header.salesOrderNo,
        }), {replace: true});
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
                            <CartPaymentSelect value={cartHeader?.paymentType ?? ''} error={!cartHeader?.paymentType}
                                               ref={paymentMethodRef} required
                                               disabled={loadingStatus !== 'idle'}
                                               onChange={valueChangeHandler('paymentType')}/>
                            <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                                       inputProps={{maxLength: 30}}
                                       disabled={loadingStatus !== 'idle'}
                                       error={!header.customerPONo}
                                       value={header?.customerPONo ?? ''} required/>
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
                    <DeleteCartButton disabled={loadingStatus !== 'idle' || cartHeader?.changed}>
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
                    <SendEmailButton salesOrderNo={header.salesOrderNo}
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
            <AlertList context={promoteCart.typePrefix}/>
            <hr/>
            <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between"
                   divider={<Divider orientation="vertical" flexItem/>}>
                <ItemAutocomplete salesOrderNo={header.salesOrderNo}/>
                <CartCommentInput cartId={header.id}/>
            </Stack>

        </Box>
    )
}
