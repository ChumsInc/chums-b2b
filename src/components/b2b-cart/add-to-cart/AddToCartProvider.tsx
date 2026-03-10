import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import type {B2BCartHeader, CartProduct} from "chums-types/b2b";
import {type ReactNode, useCallback, useMemo, useState} from "react";
import useCustomer from "@/components/customer/hooks/useCustomer.ts";
import {AddToCartContext, type AddToCartContextState} from "@/components/b2b-cart/add-to-cart/AddToCartContext.tsx";
import type {AddToCartBody, AddToCartProps} from "@/types/cart/cart-action-props";
import {addToCart} from "@/ducks/carts/actions.ts";
import {selectActiveCartStatus} from "@/ducks/carts/cartStatusSlice.ts";

export interface AddToCartProviderProps {
    cart: B2BCartHeader|null;
    cartItem: CartProduct;
    comment?: string;
    unitOfMeasure?: string;
    setActiveCart?: boolean;
    children: ReactNode;
}

export default function AddToCartProvider({
                                              cart,
                                              cartItem,
    comment,
                                              unitOfMeasure,
                                              setActiveCart,
                                              children
                                          }: AddToCartProviderProps) {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectActiveCartStatus);
    const {customerKey, shipTo} = useCustomer();
    const [cartId, setCartId] = useState<number | null>(cart?.id ?? null);
    const [quantity, setQuantity] = useState<number>(1);
    const [cartComment, setCartComment] = useState<string>(comment ?? '');
    const [cartName, setCartName] = useState<string>(cart?.customerPONo ?? '');
    const [shipToCode, setShipToCode] = useState<string | null>(cart?.shipToCode ?? shipTo?.ShipToCode ?? null);

    const addToNewCartHandler = useCallback(async (item: AddToCartBody) => {
        if (!customerKey) {
            return;
        }
        const addToCartProps: AddToCartProps = {
            cartId: null,
            cartName,
            customerKey,
            shipToCode,
            setActiveCart: true,
            item
        }
        await dispatch(addToCart(addToCartProps));
    }, [dispatch, customerKey, cartName, shipToCode])

    const addToExistingCartHandler = useCallback(async (item: AddToCartBody) => {
        if (!customerKey) {
            return;
        }
        const addToCartProps: AddToCartProps = {
            cartId,
            customerKey,
            shipToCode,
            setActiveCart,
            item
        }
        await dispatch(addToCart(addToCartProps));
    }, [dispatch, customerKey, cartId, shipToCode, setActiveCart]);

    const addToCartHandler = useCallback(async () => {
        const item = {
            itemCode: cartItem.itemCode,
            itemType: '1',
            unitOfMeasure: unitOfMeasure ?? cartItem.salesUM ?? 'EA',
            commentText: cartComment,
            productId: cartItem.productId,
            quantityOrdered: quantity,
        }
        if (!cartId) {
            await addToNewCartHandler(item);
        } else {
            await addToExistingCartHandler(item);
        }
    }, [cartId, cartItem, unitOfMeasure, quantity, cartComment, addToNewCartHandler, addToExistingCartHandler]);

    const value: AddToCartContextState = useMemo(() => {
        return {
            cartId,
            setCartId,
            quantity,
            setQuantity,
            cartName,
            setCartName,
            cartComment,
            setCartComment,
            shipToCode,
            setShipToCode,
            addToCart: addToCartHandler,
            status,
        } as AddToCartContextState;
    }, [cartId, setCartId, quantity, setQuantity, cartName, setCartName, cartComment, setCartComment, shipToCode, setShipToCode, addToCartHandler, status]);

    return (
        <AddToCartContext value={value}>
            {children}
        </AddToCartContext>
    )

}
