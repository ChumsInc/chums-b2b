import React, {useEffect} from 'react';
import numeral from "numeral";
import Decimal from "decimal.js";
import {useAppSelector} from "@/app/configureStore";
import TableFooter from "@mui/material/TableFooter";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type {SalesOrderHeader} from "chums-types/b2b";
import {selectOpenOrderById} from "@/ducks/open-orders/openOrdersSlice";

const reCustomerFreight = /^(RCP|COL|FREE|THRD)[ ~-]+([\w ]*)[ ~-]+(SWR|HOLD|RUSH)/;

interface FreightInfo {
    isCharged: boolean;
    freightMethod?: string;
    freightAmt: string;
    freightAcct?: string;
    status?: string;
}

const getFreightInfo = (header: SalesOrderHeader | null): FreightInfo => {
    if (reCustomerFreight.test(header?.Comment ?? '')) {
        const info = reCustomerFreight.exec(header?.Comment ?? '') ?? [];
        return {
            isCharged: false,
            freightMethod: info[1]?.trim() ?? '',
            freightAmt: '0.00',
            freightAcct: info[2]?.trim() ?? '',
            status: info[3]?.trim() ?? '',
        }
    }
    return {
        isCharged: true,
        freightAmt: new Decimal(header?.FreightAmt ?? 0).gt(0) ? numeral(header?.FreightAmt).format("0,0.00") : 'TBD',
    }
}

export default function SalesOrderTotal({salesOrderNo}: {
    salesOrderNo?: string;
}) {
    const header = useAppSelector((state) => selectOpenOrderById(state, salesOrderNo ?? ''));
    const [freightInfo, setFreightInfo] = React.useState<FreightInfo>(getFreightInfo(header));

    useEffect(() => {
        setFreightInfo(getFreightInfo(header));
    }, [header]);

    if (!header) {
        return null;
    }

    const subTotal = new Decimal(header.NonTaxableAmt).add(header.TaxableAmt);
    const total = subTotal.add(header.FreightAmt ?? 0).add(header.SalesTaxAmt ?? 0).sub(header.DepositAmt ?? 0).sub(header.DiscountAmt ?? 0);


    return (
        <TableFooter>
            <TableRow>
                <TableCell component="th" scope="row" colSpan={5} align="right">Sub Total</TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell align="right">
                    {numeral(new Decimal(header.NonTaxableAmt).add(header.TaxableAmt)).format('$ 0,0.00')}
                </TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row" colSpan={5} align="right">
                    Sales Tax {!new Decimal(header.SalesTaxAmt).eq(0) ? header.TaxSchedule : ''}
                </TableCell>
                <TableCell colSpan={2}> </TableCell>
                <TableCell align="right">{numeral(header.SalesTaxAmt || 0).format('$ 0,0.00')}</TableCell>
                <TableCell> </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={5} align="right">Freight</TableCell>
                <TableCell colSpan={2}>
                    {!!freightInfo.freightAcct && <span>{freightInfo.freightMethod} - {freightInfo.freightAcct}</span>}
                </TableCell>
                <TableCell align="right">
                    {freightInfo.freightAmt === 'TBD' || new Decimal(freightInfo.freightAmt).isNaN()
                        ? 'TBD'
                        : numeral(freightInfo.freightAmt).format('$ 0,0.00')}
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
                <TableCell align="right">
                    {freightInfo.freightAmt === 'TBD' || new Decimal(freightInfo.freightAmt).isNaN()
                        ? 'TBD'
                        : numeral(total.toString()).format('$ 0,0.00')}
                </TableCell>
                <TableCell> </TableCell>
            </TableRow>
        </TableFooter>
    )
}
