import {createContext, useContext} from "react";
import type {CartStatusValue} from "@/types/cart/cart-utils";

export interface AddToCartContextState {
    cartId: number|null;
    setCartId: (value: number|null) => void;
    quantity: number;
    setQuantity: (value: number) => void;
    cartComment: string;
    setCartComment: (value: string) => void;
    cartName: string;
    setCartName: (value: string) => void;
    shipToCode: string | null;
    setShipToCode: (value: string | null) => void;
    addToCart: () => void;
    status: CartStatusValue;
}

export const AddToCartContext = createContext<AddToCartContextState | null>(null);

export const useAddToCart = () => {
    const context = useContext(AddToCartContext) as AddToCartContextState;
    if (!context) {
        throw new Error('useAddToCart must be used within an AddToCartProvider');
    }
    return context;
}
