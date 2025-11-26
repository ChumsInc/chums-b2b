

import {type FormEvent, useCallback, useEffect, useState} from 'react';
import {addToCart} from "@/ducks/carts/actions";
import {selectCustomerAccount, selectCustomerKey,} from "@/ducks/customer/currentCustomerSlice";
import ShipToSelect from "@/components/customer/common/ShipToSelect";
import {loadCustomerPermissions} from "@/ducks/customer/actions";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import CartNameInput from "./CartNameInput";
import AddToCartButton from "./AddToCartButton";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import CartSelect from "@/components/b2b-cart/add-to-cart/CartSelect";
import CartQuantityInput from "@/components/b2b-cart/CartQuantityInput.tsx";
import type {CartProduct} from "chums-types/b2b";
import Box from "@mui/material/Box";
import type {B2BCartHeader} from "@/types/cart/cart-header";
import {selectCartHeaderById, selectCartHeaders,} from "@/ducks/carts/cartHeadersSlice";
import {selectCartsStatus, selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import {ga4AddToCart} from "@/utils/ga4/cart";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {selectCustomerShipToCode} from "@/ducks/customer/customerShipToAddressSlice";
import {selectCustomerPermissions, selectCustomerPermissionsStatus} from "@/ducks/customer/customerPermissionsSlice";

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
    const activeCartId = useAppSelector(selectActiveCartId);
    const activeCart = useAppSelector((state) => selectCartHeaderById(state, activeCartId));
    const customer = useAppSelector(selectCustomerAccount);
    const permissions = useAppSelector(selectCustomerPermissions);
    const permissionsStatus = useAppSelector(selectCustomerPermissionsStatus);
    const currentShipToCode = useAppSelector(selectCustomerShipToCode);
    const cartsStatus = useAppSelector(selectCartsStatus);

    const [cartId, setCartId] = useState<number | null>(activeCart?.id ?? null);
    const [cartComment, setCartComment] = useState<string>(comment ?? '');
    const [cartName, setCartName] = useState<string>(activeCart?.customerPONo ?? '');
    const [shipToCode, setShipToCode] = useState<string | null>(activeCart?.shipToCode ?? null);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId ?? 0));

    const submitHandler = useCallback(async (ev: FormEvent) => {
        ev.preventDefault();
        if (disabled || !customerKey || !cartName) {
            return;
        }
        ga4AddToCart(cartItem, quantity);
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
    }, [cartId, quantity, customerKey, cartName, shipToCode, cartItem, cartComment, setActiveCart, onDone]);

    const setCartState = useCallback((cart: B2BCartHeader | null) => {
        setCartId(cart?.id ?? 0);
        // setCart(cart);
        setShipToCode(cart?.shipToCode ?? null);
        setCartName(cart?.customerPONo ?? '');
    }, [])

    useEffect(() => {
        if (!permissions && permissionsStatus === 'idle') {
            dispatch(loadCustomerPermissions(customer));
        }
    }, [customer, dispatch, permissions, permissionsStatus])

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
        const _shipToCode = currentShipToCode;
        if (!_shipToCode) {
            if (permissions?.billTo) {
                setShipToCode(customer?.PrimaryShipToCode ?? '');
            } else {
                setShipToCode(permissions?.shipTo[0] ?? '');
            }

        }
        setShipToCode(_shipToCode ?? '');
    }, [currentShipToCode, customer, permissions]);


    const cartChangeHandler = (value: number) => {
        const [cart] = carts.filter(_cart => _cart.id === value);
        setCartState(cart ?? null);
    }

    const onChangeCartName = (value: string) => {
        setCartName(value)
    }

    const shipToCodeChangeHandler = (code: string | null) => {
        setShipToCode(code)
    }

    return (
        <form onSubmit={submitHandler} className="add-to-cart" method="post">
            <Stack spacing={2} direction="column">
                <CartSelect cartId={cartId === excludeCartId ? 0 : cartId} onChange={cartChangeHandler} required
                            excludeCartId={excludeCartId}/>
                {!cartId && cartsStatus === 'loading' && (
                    <LinearProgress variant="indeterminate" aria-label="Loading Carts"/>
                )}
                {(!cartId && cartsStatus === 'idle') && (
                    <Stack spacing={2} direction={{xs: "column", md: "row"}}>
                        <Box sx={{width: '50%'}}>
                            <CartNameInput value={cartName} onChange={onChangeCartName} required
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
                    <CartQuantityInput quantity={quantity} onChange={onChangeQuantity}
                                       unitOfMeasure={unitOfMeasure ?? cartItem.salesUM ?? 'EA'}
                                       disabled={disabled} required/>
                    <AddToCartButton disabled={disabled || !quantity || cartStatus !== 'idle'}/>
                </Stack>
                {cartStatus !== 'idle' && <LinearProgress variant="indeterminate"/>}
            </Stack>
        </form>
    );
}
