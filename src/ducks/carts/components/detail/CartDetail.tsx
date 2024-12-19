import React, {useEffect, useState} from 'react';
import CartDetailLine from "./CartDetailLine";
import CartTotal from "./CartTotal";
import {CartProduct, SalesOrderDetailLine} from "b2b-types";
import Dialog from "@mui/material/Dialog";
import {detailToCartItem} from "@ducks/sales-order/utils";
import {useAppSelector} from "@app/configureStore";
import {sendGtagEvent} from "@api/gtag";
import Decimal from "decimal.js";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {selectCartDetailById, selectCartHeaderById} from "@ducks/carts/selectors";
import AddToCartForm from "@ducks/carts/components/add-to-cart/AddToCartForm";

export default function CartDetail({cartId}: {
    cartId: number;
}) {
    const detail = useAppSelector((state) => selectCartDetailById(state, cartId));
    const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
    const [cartItem, setCartItem] = useState<CartProduct | null>(null)
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>('EA');

    useEffect(() => {
        if (header && detail.length) {
            sendGtagEvent('view_cart', {
                currency: 'USD',
                value: new Decimal(header.subTotalAmt).sub(header.DiscountAmt ?? 0).toNumber(),
                items: detail
                    .filter(item => !(item.lineStatus === 'U' && item.quantityOrdered === 0))
                    .map(item => ({
                    item_id: item.itemCode,
                    item_name: item.itemCodeDesc ?? item.itemCode,
                    quantity: +item.quantityOrdered,
                    price: new Decimal(item.extensionAmt).toNumber()
                }))
            })
        }
    }, [header, detail]);

    const addToCartHandler = (line: SalesOrderDetailLine) => {
        setUnitOfMeasure(line.UnitOfMeasure);
        const item = detailToCartItem(line);
        if (!item) {
            setCartItem(null);
            return;
        }
        setCartItem({...item, name: line.ItemCodeDesc, productId: 0, image: ''});
    }

    const quantityChangeHandler = (quantity: number) => {
        if (!cartItem) {
            return;
        }
        setCartItem({...cartItem, quantity});
    }

    const open = !!cartItem;

    return (
        <TableContainer sx={{mt: 3}}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>U/M</TableCell>
                        <TableCell align="right">Ordered</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right">MSRP</TableCell>
                        <TableCell align="right">Item Price</TableCell>
                        <TableCell align="right">Ext Price</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {detail
                        .filter(item => !(item.lineStatus === 'U' && item.quantityOrdered === 0))
                        .map(line => (
                        <CartDetailLine key={line.id} line={line}
                                        onAddToCart={addToCartHandler}/>
                    ))}
                </TableBody>
                <CartTotal cartId={cartId}/>
            </Table>
            <Dialog open={open} onClose={() => setCartItem(null)}>
                <DialogTitle>Add {cartItem?.itemCode} To Cart</DialogTitle>
                <DialogContent>
                    {!!cartItem && (
                        <AddToCartForm cartItem={cartItem}
                                       unitOfMeasure={unitOfMeasure}
                                       quantity={cartItem?.quantity ?? 1} onChangeQuantity={quantityChangeHandler}
                                       excludeCartId={cartId}
                                       onDone={() => setCartItem(null)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setCartItem(null)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    )
}
