import React, {useState} from 'react';
import type {CartProduct, SalesOrderDetailLine} from "chums-types/b2b";
import Dialog from "@mui/material/Dialog";
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
import OrderDetailLine from "./OrderDetailLine.js";
import SalesOrderTotal from "./SalesOrderTotal.js";
import {detailToCartItem} from "@/ducks/sales-order/utils.js";
import {selectSalesOrderDetail} from "@/ducks/open-orders/currentOrderSlice.js";
import {useAppSelector} from "@/app/hooks.js";
import AddToCartForm from "@/components/b2b-cart/add-to-cart/AddToCartForm.js";

export default function OrderDetail({salesOrderNo}: {
    salesOrderNo?: string;
}) {
    const detail = useAppSelector(selectSalesOrderDetail);
    const [cartItem, setCartItem] = useState<CartProduct | null>(null)
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>('EA');

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
    if (!salesOrderNo) {
        return null;
    }
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
                    {detail.map(line => (
                        <OrderDetailLine key={line.LineSeqNo} line={line}
                                         onAddToCart={addToCartHandler}/>
                    ))}
                </TableBody>
                <SalesOrderTotal salesOrderNo={salesOrderNo}/>
            </Table>
            <Dialog open={open} onClose={() => setCartItem(null)}>
                <DialogTitle>Add {cartItem?.itemCode} To Cart</DialogTitle>
                <DialogContent>
                    {!!cartItem && (
                        <AddToCartForm cartItem={cartItem}
                                       unitOfMeasure={unitOfMeasure}
                                       quantity={cartItem?.quantity ?? 1} onChangeQuantity={quantityChangeHandler}
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
