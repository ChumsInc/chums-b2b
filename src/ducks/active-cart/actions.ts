import {createAction} from "@reduxjs/toolkit";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {CustomerShippingAccount} from "@typeDefs/customer";
import {CartProgress} from "@typeDefs/cart/cart-utils";
import {SortProps} from "b2b-types";

export const setCurrentCartId = createAction<number>('activeCart/setCurrentCartId')
export const setCartShippingAccount = createAction<CustomerShippingAccount | null>('activeCart/setCartShippingAccount');
export const setCartCheckoutProgress = createAction<CartProgress>('activeCart/setCartCheckoutProgress');
export const setShipDate = createAction<string>('activeCart/setShipDate');
export const setCartDetailSort = createAction<SortProps<B2BCartDetail>>('activeCart/setCartDetailSort');



