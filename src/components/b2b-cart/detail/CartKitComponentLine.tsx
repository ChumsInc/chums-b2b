import type {Editable} from "b2b-types";
import classNames from "classnames";
import OrderItemImage from "@/components/OrderItemImage";
import UPCA from "@/components/common/upc-a";
import AvailabilityAlert from "@/components/AvailabilityAlert";
import numeral from "numeral";
import Decimal from "decimal.js";
import CartLineButtons from "./CartLineButtons";
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import type {B2BCartDetail} from "@/types/cart/cart-detail";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Stack from "@mui/material/Stack";


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
                <Stack direction="row">
                    <div>
                        <ArrowRightIcon />
                    </div>
                    <div>
                        <div>{line.itemCode}</div>
                        {line.itemType === '1' && (
                            <OrderItemImage itemCode={line.itemCode} itemCodeDesc={line.itemCodeDesc}
                                            image={line.cartProduct.image} colorCode={line.cartProduct.colorCode} />
                        )}
                    </div>
                </Stack>
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
            <TableCell align="center">
                {numeral(line.quantityOrdered).format('0,0')}
            </TableCell>
            <TableCell align="right">
                {new Decimal(unitPrice ?? 0).eq(0) ? null : numeral(unitPrice).format('0,0.00')}
            </TableCell>
            <TableCell align="right">{numeral(line.pricing.suggestedRetailPrice).format('0,0.00')}</TableCell>
            <TableCell align="right">
                {new Decimal(unitPrice ?? 0).eq(0) ? null : numeral(itemPrice).format('0,0.00')}
            </TableCell>
            <TableCell align="right">
                {new Decimal(unitPrice ?? 0).eq(0)
                    ? null
                    : numeral(new Decimal(line.quantityOrdered).times(itemPrice)).format('0,0.00')}
            </TableCell>
            <TableCell align="right">
                <CartLineButtons onCopyToCart={onAddToCart}
                                 copyToCartDisabled={readOnly || (!line.productType || line.productType === 'D' || line.cartProduct.inactiveItem || line.itemType !== '1')}
                />
            </TableCell>
        </TableRow>
    )
}


