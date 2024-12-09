import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {addressFromShipToAddress, multiLineAddress} from "../../customer/utils";
import Typography from "@mui/material/Typography";
import {NavLink, useParams} from "react-router";
import {genInvoicePath} from "@utils/path-utils";
import {selectCurrentCustomer} from "../../user/selectors";
import {getShippingMethod} from "@constants/account";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {loadSalesOrder} from "../actions";
import Grid from '@mui/material/Unstable_Grid2';
import {selectSalesOrder, selectSalesOrderInvoices} from "../selectors";
import DuplicateCartDialog from "../../cart/components/DuplicateCartDialog";
import {isClosedSalesOrder} from "../../sales-order/utils";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";


function isValidDate(date: string | null | undefined): boolean {
    return !!date && dayjs(date).isValid() && dayjs(date).valueOf() > 0;
}

function toDateString(date: string | null | undefined): string {
    return isValidDate(date)
        ? dayjs(date).format('YYYY-MM-DD')
        : ''
}

const SalesOrderHeaderElement = () => {
    const dispatch = useAppDispatch();
    const params = useParams<{ salesOrderNo: string }>();
    const customer = useSelector(selectCurrentCustomer);
    const header = useAppSelector((state) => selectSalesOrder(state, params?.salesOrderNo ?? ''));
    const invoices = useAppSelector((state) => selectSalesOrderInvoices(state, params?.salesOrderNo ?? ''));
    const [showDuplicateCart, setShowDuplicateCart] = useState(false);
    const [hasCancelDate, setHasCancelDate] = useState(isValidDate(header?.UDF_CANCEL_DATE));
    const [cancelDate, setCancelDate] = useState(toDateString(header?.UDF_CANCEL_DATE));
    const [orderDate, setOrderDate] = useState(toDateString(header?.OrderDate));
    const [shipDate, setShipDate] = useState(toDateString(header?.ShipExpireDate));

    useEffect(() => {
        setHasCancelDate(isValidDate(header?.UDF_CANCEL_DATE));
        setCancelDate(toDateString(header?.UDF_CANCEL_DATE));
        setOrderDate(toDateString(header?.OrderDate));
        setShipDate(toDateString(header?.ShipExpireDate));
    }, [header]);

    const reloadHandler = () => {
        if (!customer || !header) {
            return;
        }
        dispatch(loadSalesOrder(header?.SalesOrderNo))
    }

    if (!customer || !header) {
        return null;
    }
    return (
        <div>
            <Grid container spacing={2}>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <TextField label="Order Date" type="date" fullWidth variant="filled" size="small"
                                   value={orderDate} placeholder=""
                                   inputProps={{readOnly: true}}/>
                        <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                                   value={header?.CustomerPONo ?? ''}
                                   inputProps={{readOnly: true}}/>
                        {hasCancelDate && (
                            <TextField label="Cancel Date" type="date" fullWidth
                                       value={cancelDate}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        )}
                        <TextField label="Requested Ship Date" type="date" size="small" variant="filled" fullWidth
                                   value={shipDate}
                                   inputProps={{readOnly: true}}/>
                        {isClosedSalesOrder(header) && header.LastInvoiceNo && (
                            <Stack spacing={2} direction="row">
                                <TextField label="Invoice No" type="text" fullWidth
                                           value={header.LastInvoiceNo}
                                           variant="filled" size="small" inputProps={{readOnly: true}}/>
                                {dayjs(header.LastInvoiceDate).isValid() && (
                                    <TextField label="Invoice Date" type="date" fullWidth
                                               value={dayjs(header.LastInvoiceDate).format('YYYY-MM-DD')}
                                               variant="filled" size="small" inputProps={{readOnly: true}}/>
                                )}
                            </Stack>
                        )}
                        {header?.UDF_PROMO_DEAL && (
                            <TextField label="Promo Code" type="text" fullWidth
                                       value={header?.UDF_PROMO_DEAL ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        )}
                        {!!invoices.length && (
                            <div>
                                <Typography>Invoices:</Typography>
                                {invoices.map(inv => <Chip key={inv} label={inv} component={NavLink}
                                                           to={genInvoicePath(customer, inv)}/>)}
                            </div>
                        )}
                    </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <TextField label="Ship To Code" type="text" variant="filled" size="small"
                                   value={header?.ShipToCode ?? 'Default Address'}
                                   inputProps={{readOnly: true}}/>
                        <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                                   value={multiLineAddress(addressFromShipToAddress(header), true).join('\n')}
                                   inputProps={{readOnly: true}}/>
                        <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                            <TextField label="Ship Via" type="text" fullWidth
                                       value={getShippingMethod(header?.ShipVia)?.description ?? header?.ShipVia ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                            <TextField label="Ship Comment" type="text" fullWidth
                                       value={header?.Comment ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        </Stack>
                        <Stack spacing={2} direction={{sm: 'column', md: 'row'}} sx={{justifyContent: 'flex-end'}}>
                            <Button type="button" variant="text" onClick={reloadHandler}>Reload</Button>
                            <Button type="button" variant="outlined" onClick={() => setShowDuplicateCart(true)}>Duplicate
                                Order</Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <DuplicateCartDialog open={showDuplicateCart} salesOrderNo={header?.SalesOrderNo}
                                 shipToCode={header.ShipToCode}
                                 onClose={() => setShowDuplicateCart(false)}/>
        </div>
    )
}

export default SalesOrderHeaderElement;
