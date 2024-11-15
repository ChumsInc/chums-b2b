import React, {Fragment, useState} from 'react';
import SalesOrderCommentLine from "./CartCommentLine";
import {Editable, SalesOrderDetailLine} from "b2b-types";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {updateCartItem} from "@ducks/carts/actions";
import CartItemLine from "./CartItemLine";
import CartKitComponentLine from "./CartKitComponentLine";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";
import {selectCustomerKey} from "@ducks/customer/selectors";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";
import {UpdateCartItemBody} from "@typeDefs/cart/cart-action-props";


export default function CartDetailLine({
                                           detailLine,
                                           readOnly,
                                           customerPriceLevel,
                                           onAddToCart,
                                       }: {
    detailLine: B2BCartDetail & Editable;
    readOnly?: boolean;
    customerPriceLevel?: string;
    onAddToCart?: (line: SalesOrderDetailLine) => void;
}) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const commentRef = React.createRef<HTMLInputElement>();
    const [line, setLine] = useState<B2BCartDetail & Editable>(detailLine);

    const deleteHandler = () => {
        if (readOnly || !customerKey) {
            return;
        }
        const body: UpdateCartItemBody = {quantityOrdered: 0, commentText: ''};
        dispatch(updateCartItem({
            customerKey,
            cartId: detailLine.cartHeaderId,
            cartItemId: detailLine.id,
            body
        }));
    }

    const deleteCommentHandler = () => {
        if (readOnly) {
            return;
        }
        setLine({...line, commentText: '', changed: true});
    }

    const quantityChangeHandler = (value: string | number) => {
        if (readOnly) {
            return;
        }
        setLine({...line, quantityOrdered: +value, changed: true})
    }

    const commentChangeHandler = (value?: string) => {
        if (readOnly) {
            return;
        }
        setLine({...line, commentText: value ?? '', changed: true});
    }

    const addToCartHandler = () => {
        if (onAddToCart) {
            // onAddToCart(detailLine);
        }
    }

    const isKitComponent = !!line.soDetail.salesKitLineKey && detailLine.soDetail.salesKitLineKey !== detailLine.soDetail.lineKey;
    return (
        <>
            {detailLine.soDetail.itemType !== '4' && !isKitComponent && (
                <CartItemLine line={line} customerPriceLevel={customerPriceLevel} readOnly={readOnly}
                              onDelete={deleteHandler} onAddToCart={addToCartHandler}
                              onChangeQuantity={quantityChangeHandler} onChangeComment={commentChangeHandler}/>
            )}
            {detailLine.soDetail.productType === 'K' && detailLine.soDetail.explodedKitItem === 'Y' && (
                <TableRow sx={{verticalAlign: 'top'}}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={4}>Contains:</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                </TableRow>
            )}
            {detailLine.soDetail.itemType !== '4' && isKitComponent && (
                <CartKitComponentLine line={line} readOnly={readOnly}
                                      onAddToCart={addToCartHandler}/>
            )}


            {(detailLine.soDetail.itemType === '4' && detailLine.itemCode === '/C') && (
                <SalesOrderCommentLine line={line}
                                       ref={commentRef}
                                       onChange={commentChangeHandler} onDelete={deleteCommentHandler}/>
            )}
        </>
    )
}
