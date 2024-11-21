import React, {useState} from 'react';
import classNames from "classnames";
import OrderItemImage from "@components/OrderItemImage";
import AvailabilityAlert from "@components/AvailabilityAlert";
import numeral from "numeral";
import CartQuantityInput from "@components/CartQuantityInput";
import PriceLevelNotice from "@components/PriceLevelNotice";
import Decimal from "decimal.js";
import CartLineButtons from "./CartLineButtons";
import SalesOrderCommentLine from "./CartCommentLine";
import FormattedUPC from "@components/FormattedUPC";
import Typography from "@mui/material/Typography";
import {selectCanViewAvailable} from "@ducks/user/selectors";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import TableCell from '@mui/material/TableCell';
import TableRow from "@mui/material/TableRow";
import {selectCartItemById} from "@ducks/carts/selectors";
import {setCartItem} from "@ducks/carts/actions";

export default function CartItemLine({
                                         cartId,
                                         lineId,
                                         readOnly,
                                         customerPriceLevel,
                                         onDelete,
                                         onAddToCart,
                                     }: {
    cartId: number;
    lineId: number;
    readOnly?: boolean;
    customerPriceLevel?: string;
    onDelete?: () => void;
    onAddToCart?: () => void;
}) {
    const dispatch = useAppDispatch();
    const line = useAppSelector((state) => selectCartItemById(state, cartId, lineId));
    const commentRef = React.createRef<HTMLInputElement>();
    const canViewAvailable = useAppSelector(selectCanViewAvailable);
    const [showCommentInput, setShowCommentInput] = useState<boolean>(!!line.commentText);

    const unitPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100)).times(new Decimal(line.unitPrice).div(line.unitOfMeasureConvFactor ?? 1));
    const itemPrice = new Decimal(1).sub(new Decimal(line.lineDiscountPercent).div(100)).times(line.unitPrice);

    const quantityChangeHandler = (quantityOrdered: number) => {
        if (readOnly || quantityOrdered === line.quantityOrdered) {
            return;
        }
        dispatch(setCartItem({cartHeaderId: cartId, id: lineId, quantityOrdered}));
    }

    const rowClassName = {
        'table-warning': line.changed,
    };

    const addCommentClickHandler = () => {
        setShowCommentInput(true);
        commentRef.current?.focus();
    }

    return (
        <>
            <TableRow sx={{
                '& > *:not([rowspan="2"])': {borderBottom: showCommentInput ? 'unset' : undefined},
                verticalAlign: 'top'
            }}
                      className={classNames(rowClassName)}>
                <TableCell rowSpan={showCommentInput ? 2 : 1} component="th">
                    <Typography variant="body1" sx={{fontWeight: 700}} component="div">{line.itemCode}</Typography>
                    {line.itemType === '1' &&
                        <OrderItemImage itemCode={line.itemCode} itemCodeDesc={line.itemCodeDesc}
                                        image={line.cartProduct.image}/>}
                </TableCell>
                <TableCell>
                    <Typography variant="body1">{line.itemCodeDesc}</Typography>
                    {!!line.cartProduct.upc && <FormattedUPC value={line.cartProduct.upc}/>}
                    {!readOnly && canViewAvailable && (
                        <AvailabilityAlert quantityOrdered={line.quantityOrdered}
                                           quantityAvailable={line.cartProduct.available} season={line.season}/>
                    )}
                </TableCell>
                <TableCell>{line.unitOfMeasure}</TableCell>
                <TableCell align="right">
                    {readOnly && (<span>{line.quantityOrdered}</span>)}
                    {!readOnly && (
                        <CartQuantityInput quantity={+line.quantityOrdered} min={0}
                                           unitOfMeasure={line.unitOfMeasure ?? 'EA'}
                                           disabled={readOnly}
                                           onChange={quantityChangeHandler}/>
                    )}
                </TableCell>
                <TableCell align="right">
                    <div>{numeral(unitPrice).format('0,0.00')}</div>
                    {!!line.lineDiscountPercent && new Decimal(line.lineDiscountPercent).gt(0) && (
                        <div className="sale">{line.lineDiscountPercent}% Off</div>)}
                    {!!line.pricing.priceLevel && line.pricing.priceLevel !== customerPriceLevel && (
                        <PriceLevelNotice priceLevel={line.pricing.priceLevel}/>)}
                </TableCell>
                <TableCell align="right">{numeral(line.pricing.suggestedRetailPrice).format('0,0.00')}</TableCell>
                <TableCell align="right">{numeral(itemPrice).format('0,0.00')}</TableCell>
                <TableCell align="right">
                    {numeral(new Decimal(line.quantityOrdered).times(itemPrice)).format('0,0.00')}
                </TableCell>
                <TableCell rowSpan={showCommentInput ? 2 : 1}>
                    <CartLineButtons onDelete={onDelete} deleteDisabled={readOnly}
                                     onAddComment={addCommentClickHandler}
                                     addCommentDisabled={readOnly || showCommentInput || !!line.commentText}
                                     onCopyToCart={onAddToCart}
                                     copyToCartDisabled={(!line.productType || line.productType === 'D' || line.cartProduct.inactiveItem || line.itemType !== '1')}
                    />
                </TableCell>
            </TableRow>
            {showCommentInput && (
                <SalesOrderCommentLine cartId={cartId} lineId={lineId} ref={commentRef} readOnly={readOnly}/>
            )}
        </>
    )
}


