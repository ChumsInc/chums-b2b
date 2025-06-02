import React, {useEffect, useState} from "react";
import {SalesOrderDetailLine} from "b2b-types";
import OrderItemImage from "../../../components/OrderItemImage";
import numeral from "numeral";
import PriceLevelNotice from "../../../components/PriceLevelNotice";
import Decimal from "decimal.js";
import SalesOrderLineButtons from "./SalesOrderLineButtons";
import SalesOrderCommentLine from "./SalesOrderCommentLine";
import FormattedUPC from "../../../components/FormattedUPC";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {calcItemPrice, calcUnitPrice} from "@/ducks/open-orders/utils";

export default function SalesOrderItemLine({
                                               line,
                                               customerPriceLevel,
                                               onAddToCart,
                                           }: {
    line: SalesOrderDetailLine;
    customerPriceLevel?: string;
    onAddToCart?: () => void;
}) {
    const [unitPrice, setUnitPrice] = useState<Decimal>(calcUnitPrice(line));
    const [itemPrice, setItemPrice] = useState<Decimal>(calcItemPrice(line));
    const [lineDiscount, setLineDiscount] = useState<Decimal>(new Decimal(line.LineDiscountPercent));

    useEffect(() => {
        setUnitPrice(calcUnitPrice(line));
        setItemPrice(calcItemPrice(line));
        setLineDiscount(new Decimal(line.LineDiscountPercent));
    }, [line]);

    return (
        <>
            <TableRow sx={{
                '& > *:not([rowspan="2"])': {borderBottom: line.CommentText ? 'unset' : undefined},
                verticalAlign: 'top'
            }}
            >
                <TableCell rowSpan={line.CommentText ? 2 : 1} component="th">
                    <Typography variant="body1" sx={{fontWeight: 700}} component="div">{line.ItemCode}</Typography>
                    {line.ItemType === '1' &&
                        <OrderItemImage itemCode={line.ItemCode} itemCodeDesc={line.ItemCodeDesc} image={line.image}/>}
                </TableCell>
                <TableCell>
                    <Typography variant="body1">{line.ItemCodeDesc}</Typography>
                    {!!line.UDF_UPC && <FormattedUPC value={line.UDF_UPC}/>}
                </TableCell>
                <TableCell>{line.UnitOfMeasure}</TableCell>
                <TableCell align="right">{numeral(line.QuantityOrdered).format('0,0')}</TableCell>
                <TableCell align="right">
                    <div>{numeral(unitPrice).format('0,0.00')}</div>
                    {!lineDiscount.eq(0) && (<div className="sale">{numeral(lineDiscount).format('0,0.0')}% Off</div>)}
                    {!!line.PriceLevel && line.PriceLevel !== customerPriceLevel && (
                        <PriceLevelNotice priceLevel={line.PriceLevel}/>)}
                </TableCell>
                <TableCell align="right">{numeral(line.SuggestedRetailPrice).format('0,0.00')}</TableCell>
                <TableCell align="right">{numeral(itemPrice).format('0,0.00')}</TableCell>
                <TableCell align="right">
                    {numeral(new Decimal(line.QuantityOrdered).times(itemPrice)).format('0,0.00')}</TableCell>
                <TableCell rowSpan={line.CommentText ? 2 : 1}>
                    <SalesOrderLineButtons onCopyToCart={onAddToCart}
                                           copyToCartDisabled={(!line.ProductType || line.ProductType === 'D' || line.InactiveItem === 'Y' || line.ItemType !== '1')}
                    />
                </TableCell>
            </TableRow>
            {!!line.CommentText && (
                <SalesOrderCommentLine line={line}/>
            )}
        </>
    )
}


