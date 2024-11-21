import React from 'react';
import {Editable} from "b2b-types";
import classNames from "classnames";
import OrderItemImage from "@components/OrderItemImage";
import UPCA from "../../../../common/upc-a";
import AvailabilityAlert from "@components/AvailabilityAlert";
import numeral from "numeral";
import Decimal from "decimal.js";
import CartLineButtons from "./CartLineButtons";
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import {B2BCartDetail} from "@typeDefs/cart/cart-detail";


export default function CartKitComponentLine({
                                                 line,
                                                 readOnly,
                                                 onAddToCart,
                                             }: {
    line: B2BCartDetail & Editable;
    readOnly?: boolean;
    onAddToCart?: () => void;
}) {
    const unitPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100))
        .times(new Decimal(line.unitPrice).div(line.unitOfMeasureConvFactor ?? 1));
    const itemPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100)).times(line.unitPrice);

    const rowClassName = {};
    return (
        <TableRow sx={{verticalAlign: 'top'}} className={classNames(rowClassName)}>
            <TableCell>
                <div>{line.itemCode}</div>
                {line.itemType === '1' &&
                    <OrderItemImage itemCode={line.itemCode} itemCodeDesc={line.itemCodeDesc}
                                    image={line.cartProduct.image}/>}
            </TableCell>
            <TableCell>
                <p>{line.itemCodeDesc}</p>
                {!!line.cartProduct.upc && <p>{UPCA.format(line.cartProduct.upc)}</p>}
                {!readOnly && (
                    <AvailabilityAlert quantityOrdered={line.quantityOrdered}
                                       quantityAvailable={line.cartProduct.available ?? 0}/>
                )}
            </TableCell>
            <TableCell>{line.unitOfMeasure}</TableCell>
            <TableCell className="text-end">
                {numeral(line.quantityOrdered).format('0,0')}
            </TableCell>
            <TableCell className="right">
                {numeral(unitPrice).format('0,0.00')}
            </TableCell>
            <TableCell
                className="right hidden-xs">{numeral(line.pricing.suggestedRetailPrice).format('0,0.00')}</TableCell>
            <TableCell className="right hidden-xs">{numeral(itemPrice).format('0,0.00')}</TableCell>
            <TableCell
                className="right">{numeral(new Decimal(line.quantityOrdered).times(itemPrice)).format('0,0.00')}</TableCell>
            <TableCell className="right">
                <CartLineButtons onCopyToCart={onAddToCart}
                                 copyToCartDisabled={readOnly || (!line.productType || line.productType === 'D' || line.cartProduct.inactiveItem || line.itemType !== '1')}
                />
            </TableCell>
        </TableRow>
    )
}


