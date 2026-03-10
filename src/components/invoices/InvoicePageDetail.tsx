import {useState} from 'react';
import {selectSortedInvoiceDetail} from "@/ducks/invoices/currentInvoiceSlice";
import InvoiceDetailLine from "./InvoiceDetailLine";
import TableFooter from "@mui/material/TableFooter";
import type {CartProduct, InvoiceHistoryDetail} from "chums-types/b2b";
import InvoiceFooter from "./InvoiceFooter";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import TableRow from "@mui/material/TableRow";
import {useAppSelector} from "@/app/hooks";
import AddToCartDialog from "@/components/b2b-cart/add-to-cart/AddToCartDialog.tsx";

const InvoicePageDetail = () => {
    const detail = useAppSelector(selectSortedInvoiceDetail);
    const [cartItem, setCartItem] = useState<CartProduct | null>(null);
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>('EA');

    const addToCartHandler = (line: InvoiceHistoryDetail) => {
        setUnitOfMeasure(line.UnitOfMeasure);
        const item: CartProduct = {
            itemCode: line.ItemCode,
            quantity: Math.abs(+line.QuantityOrdered),
            comment: line.CommentText,
            name: line.ItemCodeDesc,
            productId: 0,
            image: ''
        }
        setCartItem(item);
    }

    const closeCartDialog = () => {
        setCartItem(null);
    }

    if (!detail.length) {
        return null
    }

    const open = !!cartItem;

    return (
        <TableContainer sx={{mt: 3}}>
            <Table size="small">
                <TableHead>
                    <TableRow className="order-detail">
                        <TableCell>Item</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>U/M</TableCell>
                        <TableCell align="right">Ordered</TableCell>
                        <TableCell align="right">Unit Price</TableCell>
                        <TableCell align="right" sx={{display: {xs: 'none', md: 'table-cell'}}}>MSRP</TableCell>
                        <TableCell align="right" sx={{display: {xs: 'none', md: 'table-cell'}}}>Item
                            Price</TableCell>
                        <TableCell align="right">Ext Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {detail
                        .map(line => (
                            <InvoiceDetailLine key={line.DetailSeqNo} line={line}
                                               onAddToCart={addToCartHandler}/>
                        ))
                    }
                </TableBody>
                <TableFooter>
                    <InvoiceFooter/>
                </TableFooter>
            </Table>
            <AddToCartDialog item={cartItem} unitOfMeasure={unitOfMeasure}
                             open={open} onClose={closeCartDialog}
                             onDone={closeCartDialog} onCancel={closeCartDialog}/>
        </TableContainer>
    )
}

export default InvoicePageDetail;
