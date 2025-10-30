import {useEffect, useState} from 'react';
import CartDetailLine from "./CartDetailLine";
import CartTotal from "./CartTotal";
import type {CartProduct} from "b2b-types";
import {useAppSelector} from "@/app/configureStore";
import {ga4ViewCart} from "@/utils/ga4/cart";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from '@mui/material/TableBody';
import {selectCartHeaderById} from "@/ducks/carts/cartHeadersSlice";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import {cartDetailToCartProduct} from "@/ducks/carts/utils";
import AddToCartDialog from "@/components/b2b-cart/add-to-cart/AddToCartDialog";
import {selectCartDetailById} from "@/ducks/carts/cartDetailSlice";

export default function CartDetail({cartId}: {
    cartId: number;
}) {
    const detail = useAppSelector((state) => selectCartDetailById(state, cartId));
    const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
    const [cartItem, setCartItem] = useState<CartProduct | null>(null)
    const [unitOfMeasure, setUnitOfMeasure] = useState<string>('EA');

    useEffect(() => {
        ga4ViewCart(header, detail);
    }, [header, detail]);

    const addToCartHandler = (line: B2BCartDetail) => {
        setUnitOfMeasure(line.unitOfMeasure ?? 'EA');
        const item = cartDetailToCartProduct(line);
        if (!item) {
            setCartItem(null);
            return;
        }
        setCartItem(item);
    }

    const dialogCloseHandler = () => {
        setCartItem(null);
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
                    {detail
                        // .filter(item => item.lineStatus !== 'U')
                        .map(line => (
                            <CartDetailLine key={line.id} line={line}
                                            onAddToCart={addToCartHandler}/>
                        ))}
                </TableBody>
                <CartTotal cartId={cartId}/>
            </Table>
            <AddToCartDialog item={cartItem} unitOfMeasure={unitOfMeasure}
                             open={!!cartItem} onClose={dialogCloseHandler}
                             onDone={dialogCloseHandler} onCancel={dialogCloseHandler}/>
        </TableContainer>
    )
}
