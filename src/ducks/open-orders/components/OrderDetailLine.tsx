import React, {Fragment} from 'react';
import SalesOrderCommentLine from "./SalesOrderCommentLine";
import {SalesOrderDetailLine} from "b2b-types";
import SalesOrderItemLine from "./SalesOrderItemLine";
import SalesOrderKitComponentLine from "./SalesOrderKitComponentLine";
import TableRow from '@mui/material/TableRow';
import TableCell from "@mui/material/TableCell";


export default function OrderDetailLine({
                                            line,
                                            customerPriceLevel,
                                            onAddToCart,
                                        }: {
    line: SalesOrderDetailLine;
    customerPriceLevel?: string;
    onAddToCart?: (line: SalesOrderDetailLine) => void;
}) {


    const addToCartHandler = () => {
        if (onAddToCart) {
            onAddToCart(line);
        }
    }

    const isKitComponent = !!line.SalesKitLineKey && line.SalesKitLineKey !== line.LineKey;
    return (
        <>
            {line.ItemType !== '4' && !isKitComponent && (
                <SalesOrderItemLine line={line} customerPriceLevel={customerPriceLevel}
                                    onAddToCart={addToCartHandler}/>
            )}
            {line.ProductType === 'K' && line.ExplodedKitItem === 'Y' && (
                <TableRow sx={{verticalAlign: 'top'}}>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell colSpan={4}>Contains:</TableCell>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>&nbsp;</TableCell>
                </TableRow>
            )}
            {line.ItemType !== '4' && isKitComponent && (
                <SalesOrderKitComponentLine line={line} onAddToCart={addToCartHandler}/>
            )}


            {(line.ItemType === '4' && line.ItemCode === '/C') && (
                <SalesOrderCommentLine line={line}/>
            )}
        </>
    )
}
