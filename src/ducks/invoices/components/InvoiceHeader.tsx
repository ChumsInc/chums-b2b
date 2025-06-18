import React, {useState} from 'react';
import {loadInvoice} from '../actions';
import {useSelector} from "react-redux";
import DuplicateCartDialog from "../../carts/components/DuplicateCartDialog";
import {ShippingMethods} from "@/utils/general";
import TrackingLinkBadge from "../../../components/TrackingLinkBadge";
import {selectCurrentInvoice} from "../selectors";
import {useAppDispatch} from "@/app/configureStore";
import dayjs from "dayjs";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import ShipToSelect from "../../customer/components/ShipToSelect";
import {addressFromShipToAddress, multiLineAddress} from "../../customer/utils";
import Decimal from "decimal.js";
import numeral from "numeral";
import {selectCustomerPermissions} from "../../customer/selectors";

const InvoiceHeader = () => {
    const dispatch = useAppDispatch();
    const invoice = useSelector(selectCurrentInvoice);
    const [confirmDuplicate, setConfirmDuplicate] = useState(false);
    const permissions = useSelector(selectCustomerPermissions);

    const onCancelDuplicate = () => {
        setConfirmDuplicate(false);
    }

    const onReload = () => {
        if (!invoice) {
            return;
        }
        dispatch(loadInvoice(invoice));
    }

    if (!invoice) {
        return null;
    }

    const cancelHidden = !invoice.UDF_CANCEL_DATE || dayjs(invoice.UDF_CANCEL_DATE).valueOf() === 0;

    return (
        <div className="mb-1">
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack spacing={2} direction="column">
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            <TextField label="Sales Order" type="text" fullWidth variant="filled" size="small"
                                       value={invoice.SalesOrderNo ?? 'Direct Invoice'} placeholder=""
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                            <TextField label="Purchase Order #" type="text" fullWidth variant="filled" size="small"
                                       value={invoice.CustomerPONo} placeholder=""
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                        </Stack>
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            {!!invoice.OrderDate && !!invoice.SalesOrderNo && (
                                <TextField label="Order Date" type="date" fullWidth variant="filled" size="small"
                                           value={dayjs(invoice.OrderDate).format('YYYY-MM-DD')} placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            )}
                            {!!invoice.ShipDate && (
                                <TextField label="Req. Ship Date" type="date" fullWidth variant="filled" size="small"
                                           value={dayjs(invoice.ShipDate).format('YYYY-MM-DD')} placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            )}
                            {!cancelHidden && (
                                <TextField label="Cancel Date" type="date" fullWidth variant="filled" size="small"
                                           value={dayjs(invoice.UDF_CANCEL_DATE).format('YYYY-MM-DD')}
                                           placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            )}
                        </Stack>
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            <TextField label="Invoice Date" type="date" fullWidth variant="filled" size="small"
                                       value={dayjs(invoice.InvoiceDate).format('YYYY-MM-DD')} placeholder=""
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                            {!!invoice.InvoiceDueDate && (
                                <TextField label="Invoice Due Date" type="date" fullWidth variant="filled" size="small"
                                           value={dayjs(invoice.InvoiceDueDate).format('YYYY-MM-DD')} placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            )}
                            {permissions?.billTo && (
                                <TextField label="Balance Due" type="text" fullWidth variant="filled" size="small"
                                           value={numeral(new Decimal(invoice.Balance ?? '0')).format('$ 0,0.00')}
                                           placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>)}
                        </Stack>
                        <Stack spacing={2} direction={{xs: 'column', lg: 'row'}}>
                            {!!invoice.UDF_PROMO_DEAL && (
                                <TextField label="Promo Code" type="text" fullWidth variant="filled" size="small"
                                           value={invoice.UDF_PROMO_DEAL} placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            )}
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack spacing={2} direction="column">
                        <ShipToSelect value={invoice.ShipToCode} onChange={() => {
                        }} readOnly/>
                        <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                                   value={multiLineAddress(addressFromShipToAddress(invoice), true).join('\n')}
                                   slotProps={{
                                       htmlInput: {readOnly: true}
                                   }}/>
                        <Stack spacing={2} direction="row" useFlexGap>
                            <div>
                                <TextField label="Ship Method" type="text" fullWidth variant="filled" size="small"
                                           value={ShippingMethods[invoice.ShipVia ?? '-']?.description ?? 'Unknown'}
                                           placeholder=""
                                           slotProps={{
                                               htmlInput: {readOnly: true}
                                           }}/>
                            </div>
                            <div>
                                {!invoice.Track?.length &&
                                    <Alert severity="info">Tracking is not available for this invoice.</Alert>}
                                {!!invoice.Track?.length && invoice.Track.map(track => (
                                    <TrackingLinkBadge key={track.PackageNo}
                                                       trackingId={track.TrackingID}
                                                       shipVia={track.StarshipShipVia} weight={track.Weight}/>)
                                )}
                            </div>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <Stack spacing={2} direction="row" sx={{justifyContent: 'flex-end', mt: 2}}>
                <Button variant="outlined" disabled={!invoice.SalesOrderNo} onClick={() => setConfirmDuplicate(true)}>
                    Duplicate Order
                </Button>
                <Button variant="text" onClick={onReload}>
                    Reload Invoice
                </Button>
            </Stack>
            <DuplicateCartDialog open={confirmDuplicate} salesOrderNo={invoice.SalesOrderNo ?? ''}
                                 shipToCode={invoice.ShipToCode}
                                 onClose={onCancelDuplicate}/>
        </div>
    )
}

export default InvoiceHeader;
