import React, {useCallback, useState} from 'react';
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import ShipToSelect from "../../customer/components/ShipToSelect";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DuplicateCartProps} from "@typeDefs/cart/cart-action-props";
import {duplicateSalesOrder} from "@ducks/carts/actions";
import {B2BCart} from "@typeDefs/cart/cart";
import {generatePath, useNavigate} from "react-router";
import {customerSlug, parseCustomerSlug} from "@utils/customer";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {selectCustomerKey} from "@ducks/customer/selectors";
import {selectCartStatusById} from "@ducks/carts/selectors";

const DuplicateCartDialog = ({open, salesOrderNo, shipToCode, onClose}: {
    open: boolean;
    salesOrderNo: string;
    shipToCode?: string | null;
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customerKey = useAppSelector(selectCustomerKey);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, 0));
    const [cartName, setCartName] = useState('');
    const [shipTo, setShipTo] = useState<string>(shipToCode ?? '');

    const onDuplicateOrder = useCallback(async () => {
        if (!salesOrderNo || !customerKey) {
            return;
        }
        const arg: DuplicateCartProps = {
            customerKey,
            salesOrderNo,
            cartName,
            shipToCode: shipTo,
        }
        const res = await dispatch(duplicateSalesOrder(arg));
        if ((res.payload as B2BCart | null)?.header) {
            const cartId = (res.payload as B2BCart).header.id;
            onClose();
            navigate(generatePath('/account/:customerSlug/carts/:cartId', {
                customerSlug: customerSlug(parseCustomerSlug(customerKey)),
                cartId: cartId.toString(),
            }))
        }
    }, [salesOrderNo, customerKey, shipTo, cartName]);

    return (
        <Dialog open={open} onClose={onClose} title="Confirm">
            <DialogTitle>Duplicate SO# {salesOrderNo}?</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to duplicate order #{salesOrderNo}?</DialogContentText>
                <Stack spacing={2} direction="column">
                    <Alert severity="info">
                        <Stack direction="column" spacing={1}>
                            <div>
                                Any discontinued items will no longer be available. Please check your new cart for
                                accuracy.
                            </div>
                            <div>
                                Comments will not copy to the new order - you may need to add those manually, or copy
                                them from this order.
                            </div>
                        </Stack>
                    </Alert>
                    <TextField autoFocus label="New Cart Name" type="text" fullWidth variant="filled"
                               value={cartName} onChange={(ev) => setCartName(ev.target.value)}/>
                    <ShipToSelect value={shipTo ?? ''} onChange={(shipToCode) => setShipTo(shipToCode ?? '')}/>
                    {cartStatus !== 'idle' && <LinearProgress variant="indeterminate"/>}
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onDuplicateOrder} disabled={!cartName}>Duplicate Order</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DuplicateCartDialog;
