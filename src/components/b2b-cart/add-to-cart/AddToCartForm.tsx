import {useAppSelector} from "@/app/hooks";
import type {CartProduct} from "chums-types/b2b";
import {selectActiveCart,} from "@/ducks/carts/cartHeadersSlice";
import {selectCartsStatus} from "@/ducks/carts/cartStatusSlice";
import AddToCartProvider from "@/components/b2b-cart/add-to-cart/AddToCartProvider.tsx";
import AddToCartUI from "@/components/b2b-cart/add-to-cart/AddToCartUI.tsx";

export interface AddToCartFormProps {
    cartItem: CartProduct;
    unitOfMeasure?: string;
    comment?: string;
    disabled?: boolean;
    onDone?: () => void;
    excludeCartId?: number;
    setActiveCart?: boolean;
}

export default function AddToCartForm({
                                          cartItem,
                                          unitOfMeasure,
                                          comment,
                                          disabled,
                                          onDone,
                                          excludeCartId,
                                          setActiveCart,
                                      }: AddToCartFormProps) {
    const activeCart = useAppSelector(selectActiveCart);
    const cartsStatus = useAppSelector(selectCartsStatus);

    let _comment = '';
    if (cartItem.season?.active && !(cartItem.season.product_available || cartItem.seasonAvailable)) {
        _comment = [`PRE-SEASON ITEM: ${cartItem.season.code}`, comment ?? ''].filter(val => !!val).join('; ');
    }


    // useEffect(() => {
    //     const _shipToCode = shipTo?.ShipToCode;
    //     if (!_shipToCode) {
    //         if (permissions?.billTo) {
    //             setShipToCode(customer?.PrimaryShipToCode ?? '');
    //         } else {
    //             setShipToCode(permissions?.shipTo[0] ?? '');
    //         }
    //         return;
    //     }
    //     setShipToCode(_shipToCode ?? '');
    // }, [shipTo, customer, permissions]);


    return (
        <AddToCartProvider cart={activeCart} cartItem={cartItem} comment={_comment}
                           unitOfMeasure={unitOfMeasure ?? cartItem.salesUM ?? 'EA'}
                           setActiveCart={setActiveCart}>
            <AddToCartUI key={activeCart?.id} disabled={disabled} loading={cartsStatus === 'loading'}
                         unitOfMeasure={unitOfMeasure ?? cartItem.salesUM ?? 'EA'} onDone={onDone}
                         excludeCartId={excludeCartId}/>
        </AddToCartProvider>
    )
}
