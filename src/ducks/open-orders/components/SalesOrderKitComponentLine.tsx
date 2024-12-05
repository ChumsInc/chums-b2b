import React, {useEffect, useState} from 'react';
import {Editable, SalesOrderDetailLine} from "b2b-types";
import {Appendable} from "@typeDefs/generic";
import classNames from "classnames";
import OrderItemImage from "@components/OrderItemImage";
import UPCA from "../../../common/upc-a";
import numeral from "numeral";
import Decimal from "decimal.js";
import SalesOrderLineButtons from "./SalesOrderLineButtons";
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import {calcItemPrice, calcUnitPrice} from "@ducks/open-orders/utils";


export default function SalesOrderKitComponentLine({
                                                       line,
                                                       onAddToCart,
                                                   }: {
    line: SalesOrderDetailLine & Editable & Appendable;
    onAddToCart?: () => void;
}) {
    const [unitPrice, setUnitPrice] = useState<Decimal>(calcUnitPrice(line));
    const [itemPrice, setItemPrice] = useState<Decimal>(calcItemPrice(line));

    useEffect(() => {
        setUnitPrice(calcUnitPrice(line));
        setItemPrice(calcItemPrice(line));
    }, [line]);

    const rowClassName = {};
    return (
        <TableRow sx={{verticalAlign: 'top'}} className={classNames(rowClassName)}>
            <TableCell>
                <div>{line.ItemCode}</div>
                {line.ItemType === '1' &&
                    <OrderItemImage itemCode={line.ItemCode} itemCodeDesc={line.ItemCodeDesc} image={line.image}/>}
            </TableCell>
            <TableCell>
                <p>{line.ItemCodeDesc}</p>
                {!!line.UDF_UPC && <p>{UPCA.format(line.UDF_UPC)}</p>}
            </TableCell>
            <TableCell>{line.UnitOfMeasure}</TableCell>
            <TableCell className="text-end">
                {numeral(line.QuantityOrdered).format('0,0')}
            </TableCell>
            <TableCell className="right">
                {numeral(unitPrice).format('0,0.00')}
            </TableCell>
            <TableCell className="right hidden-xs">{numeral(line.SuggestedRetailPrice).format('0,0.00')}</TableCell>
            <TableCell className="right hidden-xs">{numeral(itemPrice).format('0,0.00')}</TableCell>
            <TableCell
                className="right">{numeral(new Decimal(line.QuantityOrdered).times(itemPrice)).format('0,0.00')}</TableCell>
            <TableCell className="right">
                <SalesOrderLineButtons onCopyToCart={onAddToCart}/>
            </TableCell>
        </TableRow>
    )
}


