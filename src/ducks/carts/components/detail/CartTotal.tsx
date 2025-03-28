import React from 'react';
import numeral from "numeral";
import {useSelector} from "react-redux";
import Decimal from "decimal.js";
import {getShippingMethod} from "@/constants/account";
import {useAppSelector} from "@/app/configureStore";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {selectCartHeaderById} from "@/ducks/carts/cartHeadersSlice";
import {selectCartShippingAccount} from "@/ducks/carts/activeCartSlice";

export default function CartTotal({cartId}: {
    cartId: number;
}) {
    const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
    const shippingAccount = useSelector(selectCartShippingAccount);
    if (!header) {
        return null;
    }

    const subTotal = new Decimal(header.subTotalAmt);
    const total = subTotal.add(header.FreightAmt ?? 0).add(header.SalesTaxAmt ?? 0).sub(header.DepositAmt ?? 0).sub(header.DiscountAmt ?? 0);

    const isFreightTBD = () => {
        return !(getShippingMethod(header.shipVia)?.allowCustomerAccount && shippingAccount?.enabled)
    }

    return (
        <TableFooter>
            <TableRow>
                <TableCell component="th" scope="row" colSpan={5} align="right">Sub Total</TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell align="right">
                    {numeral(subTotal.toString()).format('$ 0,0.00')}
                </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" colSpan={5} align="right">
                    Sales Tax {!new Decimal(header.SalesTaxAmt ?? 0).eq(0) ? header.TaxSchedule : ''}
                </TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell align="right">
                    {header.SalesTaxAmt === null ? 'TBD' : numeral(header.SalesTaxAmt ?? 0).format('$ 0,0.00')}
                </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} align="right">Freight</TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell align="right">
                    {isFreightTBD() ? 'TBD' : numeral(header.FreightAmt ?? 0).format('$ 0,0.00')}
                </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            {!new Decimal(header.DiscountAmt ?? 0).eq(0) && (
                <TableRow>
                    <TableCell colSpan={5} align="right">Discount</TableCell>
                    <TableCell colSpan={2}> </TableCell>
                    <TableCell align="right">{numeral(header.DiscountAmt).format('$ 0,0.00')}</TableCell>
                    <TableCell> </TableCell>
                </TableRow>)}
            {!new Decimal(header.DepositAmt ?? 0).eq(0) && (
                <TableRow>
                    <TableCell colSpan={5} align="right">Deposit</TableCell>
                    <TableCell colSpan={2}> </TableCell>
                    <TableCell align="right">{numeral(header.DepositAmt).format('$ 0,0.00')}</TableCell>
                    <TableCell> </TableCell>
                </TableRow>)}
            <TableRow>
                <TableCell colSpan={5} align="right">Total</TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell
                    align="right">{isFreightTBD() ? 'TBD' : numeral(total.toString()).format('$ 0,0.00')}</TableCell>
                <TableCell> </TableCell>
            </TableRow>
        </TableFooter>
    )
}
