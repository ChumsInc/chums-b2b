import {useEffect, useState} from 'react';
import type {Editable, SalesOrderDetailLine} from "chums-types/b2b";
import type {Appendable} from "@/types/generic";
import numeral from "numeral";
import Decimal from "decimal.js";
import classNames from "classnames";
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OrderItemImage from "@/components/OrderItemImage";
import UPCA from "@/components/common/upc-a";
import SalesOrderLineButtons from "./SalesOrderLineButtons";
import {calcItemPrice, calcUnitPrice} from "@/ducks/open-orders/utils";


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
                <Stack direction="row">
                    <div>
                        <ArrowForwardIosIcon />
                    </div>
                    <div>
                        <div>{line.ItemCode}</div>
                        {line.ItemType === '1' && (
                            <OrderItemImage itemCode={line.ItemCode} itemCodeDesc={line.ItemCodeDesc} image={line.image}/>
                        )}
                    </div>
                </Stack>
            </TableCell>
            <TableCell>
                <p>{line.ItemCodeDesc}</p>
                {!!line.UDF_UPC && <p>{UPCA.format(line.UDF_UPC)}</p>}
            </TableCell>
            <TableCell>{line.UnitOfMeasure}</TableCell>
            <TableCell align="right">
                {numeral(line.QuantityOrdered).format('0,0')}
            </TableCell>
            <TableCell align="right">
                {new Decimal(unitPrice).eq(0) ? null : numeral(unitPrice).format('0,0.00')}
            </TableCell>
            <TableCell align="right" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                {numeral(line.SuggestedRetailPrice).format('0,0.00')}
            </TableCell>
            <TableCell  align="right" sx={{display: {xs: 'none', sm: 'table-cell'}}}>
                {new Decimal(itemPrice).eq(0) ? null : numeral(itemPrice).format('0,0.00')}
            </TableCell>
            <TableCell align="right">
                {new Decimal(itemPrice).eq(0) ? null : numeral(new Decimal(line.QuantityOrdered).times(itemPrice)).format('0,0.00')}
            </TableCell>
            <TableCell align="right">
                <SalesOrderLineButtons onCopyToCart={onAddToCart}/>
            </TableCell>
        </TableRow>
    )
}


