import React, {FormEvent, useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {addToCart} from "@ducks/carts/actions";
import {
    selectCustomerAccount,
    selectCustomerKey,
    selectCustomerPermissions,
    selectCustomerPermissionsLoading,
    selectCustomerShipToCode
} from "@ducks/customer/selectors";
import ShipToSelect from "@ducks/customer/components/ShipToSelect";
import {loadCustomerPermissions} from "@ducks/customer/actions";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CartNameInput from "./CartNameInput";
import AddToCartButton from "./AddToCartButton";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import CartSelect from "@ducks/carts/components/add-to-cart/CartSelect";
import CartQuantityInput from "@components/CartQuantityInput";
import {CartProduct} from "b2b-types";
import Decimal from "decimal.js";
import {sendGtagEvent} from "@api/gtag";
import Box from "@mui/material/Box";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import {selectActiveCartHeader, selectCartHeaders, selectCartStatusById} from "@ducks/carts/selectors";

export interface AddToCartFormProps {
    cartItem: CartProduct;
    quantity: number;
    unitOfMeasure?: string;
    comment?: string;
    disabled?: boolean;
    onDone?: () => void;
    onChangeQuantity: (val: number) => void;
    excludeCartId?: number;
    setActiveCart?: boolean;
    afterAddToCart?: (message: string) => void;
}

export default function AddToCartForm({
                                          cartItem,
                                          quantity,
                                          unitOfMeasure,
                                          comment,
                                          disabled,
                                          onDone,
                                          onChangeQuantity,
                                          excludeCartId,
                                          setActiveCart,
                                      }: AddToCartFormProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const carts = useAppSelector(selectCartHeaders);
    const activeCart = useAppSelector(selectActiveCartHeader);
    const customer = useSelector(selectCustomerAccount);
    const permissions = useSelector(selectCustomerPermissions);
    const permissionsLoading = useSelector(selectCustomerPermissionsLoading);
    const currentShipToCode = useSelector(selectCustomerShipToCode);

    const [cartId, setCartId] = useState<number | null>(activeCart?.id ?? null);
    // const [cart, setCart] = useState<B2BCartHeader | null>(activeCart);
    const [cartComment, setCartComment] = useState<string>(comment ?? '');
    const [cartName, setCartName] = useState<string>(activeCart?.customerPONo ?? '');
    const [shipToCode, setShipToCode] = useState<string | null>(activeCart?.shipToCode ?? null);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId));

    const submitHandler = useCallback(async (ev: FormEvent) => {
        ev.preventDefault();
        if (disabled || !customerKey) {
            return;
        }
        const price = cartItem.price ? new Decimal(cartItem.price).toNumber() : 0;
        const value = cartItem.price ? new Decimal(cartItem.price).times(quantity).toNumber() : 0;
        sendGtagEvent('add_to_cart', {
            currency: 'USD',
            value: value,
            items: [{item_id: cartItem.itemCode, item_name: cartItem.name, price: price, quantity}]
        })
        if (!cartId) {
            await dispatch(addToCart({
                cartId: null,
                cartName,
                customerKey,
                shipToCode,
                setActiveCart: true,
                item: {
                    itemCode: cartItem.itemCode,
                    itemType: '1',
                    unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? 'EA',
                    commentText: cartComment,
                    productId: cartItem.productId,
                    quantityOrdered: quantity,
                }
            }))
        } else {
            await dispatch(addToCart({
                cartId,
                customerKey,
                shipToCode,
                setActiveCart,
                item: {
                    itemCode: cartItem.itemCode,
                    itemType: '1',
                    unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? 'EA',
                    commentText: cartComment,
                    productId: cartItem.productId,
                    quantityOrdered: quantity,
                }
            }))
        }
        if (onDone) {
            onDone();
        }
    }, [cartId, customerKey, cartName, shipToCode, cartItem, cartComment, setActiveCart, onDone]);

    const setCartState = useCallback((cart: B2BCartHeader | null) => {
        setCartId(cart?.id ?? 0);
        // setCart(cart);
        setShipToCode(cart?.shipToCode ?? null);
        setCartName(cart?.customerPONo ?? '');
    }, [])

    useEffect(() => {
        if (!permissions && !permissionsLoading) {
            dispatch(loadCustomerPermissions(customer));
        }
    }, [customer, dispatch, permissions, permissionsLoading])

    useEffect(() => {
        setCartState(activeCart ?? null);
    }, [activeCart]);

    useEffect(() => {
        let _comment = '';
        if (cartItem.season?.active && !(cartItem.season.product_available || cartItem.seasonAvailable)) {
            _comment = [`PRE-SEASON ITEM: ${cartItem.season.code}`, comment ?? ''].filter(val => !!val).join('; ');
        }
        setCartComment(_comment);
    }, [cartItem]);


    useEffect(() => {
        const shipToCode = currentShipToCode;
        if (!shipToCode) {
            if (permissions?.billTo) {
                setShipToCode(customer?.PrimaryShipToCode ?? '');
            } else {
                setShipToCode(permissions?.shipTo[0] ?? '');
            }

        }
        setShipToCode(shipToCode ?? '');
    }, [currentShipToCode, customer, permissions]);


    const cartChangeHandler = (value: number) => {
        const [cart] = carts.filter(cart => cart.id === value);
        setCartState(cart ?? null);
    }

    const onChangeCartName = (value: string) => {
        setCartName(value)
    }

    const quantityChangeHandler = (quantity: number) => {
        onChangeQuantity(quantity);
    }

    const shipToCodeChangeHandler = (code: string | null) => {
        console.debug('shipToCodeChangeHandler()', {code});
        setShipToCode(code)
    }

    return (
        <form onSubmit={submitHandler} className="add-to-cart" method="post">
            <Stack spacing={2} direction="column">
                <CartSelect cartId={cartId} onChange={cartChangeHandler}
                            excludeCartId={excludeCartId}/>
                {(!cartId) && (
                    <Stack spacing={2} direction={{xs: "column", md: "row"}}>
                        <Box sx={{width: '50%'}}>
                            <CartNameInput value={cartName} onChange={onChangeCartName}
                                           error={!cartName}
                                           fullWidth
                                           helperText="Please name your cart."/>

                        </Box>
                        <Box sx={{width: '50%'}}>
                            <ShipToSelect value={shipToCode} onChange={shipToCodeChangeHandler}/>
                            {/*<ShipToAutocomplete shipToCode={shipToCode} onChange={shipToCodeChangeHandler} />*/}
                        </Box>
                    </Stack>
                )}
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                    <CartQuantityInput quantity={quantity} onChange={quantityChangeHandler}
                                       unitOfMeasure={unitOfMeasure ?? cartItem.salesUM ?? 'EA'}
                                       disabled={disabled} required/>
                    <AddToCartButton disabled={disabled || !quantity || cartStatus !== 'idle'}/>
                </Stack>
                {cartStatus !== 'idle' && <LinearProgress variant="indeterminate"/>}
            </Stack>
        </form>
    );
}
