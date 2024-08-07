import React, {useState} from 'react';
import Button, {ButtonProps} from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {removeCart} from "../actions";
import {useNavigate} from "react-router";
import {generatePath} from "react-router-dom";
import {customerSlug} from "../../../utils/customer";
import LinearProgress from "@mui/material/LinearProgress";
import {selectSalesOrder} from "../../open-orders/selectors";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export interface DeleteCartButtonProps extends ButtonProps {
    salesOrderNo?: string | null;
}

export default function DeleteCartButton({salesOrderNo, disabled, children, ...rest}: DeleteCartButtonProps) {
    const dispatch = useAppDispatch();
    const header = useAppSelector((state) => selectSalesOrder(state, salesOrderNo ?? ''));
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const clickHandler = () => {
        setOpen(true);
    }
    const closeHandler = () => setOpen(false);

    const confirmHandler = async () => {
        setBusy(true);
        await dispatch(removeCart(header!));
        setOpen(false);
        setBusy(false);
        const path = generatePath('/account/:customerSlug/carts', {
            customerSlug: customerSlug(header!)
        })
        navigate(path);
    }

    if (!header || header.OrderType !== 'Q') {
        return null;
    }

    return (
        <>
            <Button type="button" variant="text" color="error"
                    onClick={clickHandler} disabled={disabled} {...rest}>
                {children ?? 'Delete Cart'}
            </Button>
            <Dialog onClose={closeHandler} open={open} maxWidth="sm">
                <DialogTitle>Delete Cart #{header.SalesOrderNo}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete cart <strong>{header.CustomerPONo}</strong>?
                    </DialogContentText>
                    {busy && <LinearProgress variant="indeterminate"/>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={confirmHandler} disabled={busy} color="error">Delete</Button>
                    <Button onClick={closeHandler} disabled={busy} autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
