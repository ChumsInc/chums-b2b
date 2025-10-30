import {useRef} from 'react';
import CartCommentLine from "./CartCommentLine.tsx";
import type {Editable} from "b2b-types";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {saveCartItem} from "@/ducks/carts/actions.ts";
import CartItemLine from "./CartItemLine.tsx";
import CartKitComponentLine from "./CartKitComponentLine.tsx";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import {selectCustomerKey} from "@/ducks/customer/selectors.ts";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import type {UpdateCartItemBody} from "@/types/cart/cart-action-props";
import LinearProgress from "@mui/material/LinearProgress";
import {selectCartHasChanges, setCartItem} from "@/ducks/carts/cartDetailSlice.ts";
import {selectCartItemStatusById} from "@/ducks/carts/cartDetailStatusSlice.ts";


export default function CartDetailLine({
                                           line,
                                           readOnly,
                                           customerPriceLevel,
                                           onAddToCart,
                                       }: {
    line: B2BCartDetail & Editable;
    readOnly?: boolean;
    customerPriceLevel?: string;
    onAddToCart?: (line: B2BCartDetail) => void;
}) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const cartItemStatus = useAppSelector(state => selectCartItemStatusById(state, line.id));
    const hasChanges = useAppSelector((state) => selectCartHasChanges(state, line.cartHeaderId));
    const commentRef = useRef<HTMLInputElement>(null);

    const deleteHandler = () => {
        if (readOnly || !customerKey) {
            return;
        }
        if (hasChanges) {
            dispatch(setCartItem({cartHeaderId: line.cartHeaderId, id: line.id, quantityOrdered: 0}));
            return;
        }
        const item: UpdateCartItemBody = {quantityOrdered: 0, commentText: '', itemType: line.itemType};
        dispatch(saveCartItem({
            customerKey,
            cartId: line.cartHeaderId,
            cartItemId: line.id,
            item
        }));
    }

    const addToCartHandler = () => {
        if (onAddToCart) {
            onAddToCart(line);
        }
    }

    if (line.soDetail.itemType === '4') {
        return (
            <>
                <CartCommentLine cartId={line.cartHeaderId} lineId={line.id} ref={commentRef}/>
                {!!cartItemStatus && cartItemStatus !== 'idle' && (
                    <TableRow>
                        <TableCell colSpan={9}>
                            <LinearProgress variant="indeterminate"/>
                        </TableCell>
                    </TableRow>

                )}
            </>
        )
    }

    const isKitComponent = !!line.soDetail.salesKitLineKey && line.soDetail.salesKitLineKey !== line.soDetail.lineKey;

    return (
        <>
            {!isKitComponent && (
                <CartItemLine cartId={line.cartHeaderId} lineId={line.id}
                              customerPriceLevel={customerPriceLevel} readOnly={readOnly}
                              onDelete={deleteHandler} onAddToCart={addToCartHandler}/>
            )}
            {line.soDetail.productType === 'K' && line.soDetail.explodedKitItem === 'Y' && (
                <TableRow sx={{verticalAlign: 'top'}}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={4}>Contains:</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                </TableRow>
            )}
            {isKitComponent && (
                <CartKitComponentLine line={line} readOnly={readOnly}
                                      onAddToCart={addToCartHandler}/>
            )}

            {cartItemStatus !== 'idle' && (
                <TableRow>
                    <TableCell colSpan={9}>
                        <LinearProgress variant="indeterminate"/>
                    </TableCell>
                </TableRow>

            )}
        </>
    )
}
