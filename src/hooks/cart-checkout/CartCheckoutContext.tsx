import type {B2BCartDetail, B2BCartHeader, CartProgress} from "chums-types/b2b";
import type {CartStatusValue} from "@/types/cart/cart-utils";
import {createContext, useContext} from "react";

export interface CartCheckoutContextState {
    cartId: number | null;
    cartHeader: B2BCartHeader | null;
    cartDetail: B2BCartDetail[];
    status: CartStatusValue | null;
    progress: CartProgress;
    nextShipDate: string | null;
    shipDate: string | null;
    setShipDate: (arg: string | null) => void;
    setProgress: (arg: CartProgress) => void;
    reloadCart: () => void;
}

export const CartCheckoutContext = createContext<CartCheckoutContextState | null>(null);

export const useCartCheckout = () => {
    const context = useContext(CartCheckoutContext) as CartCheckoutContextState;
    if (!context) {
        throw new Error('useCartCheckout must be used within a CartCheckoutProvider');
    }
    return context;
}
