import React, {useCallback, useState} from 'react';
import Button, {ButtonProps} from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {removeCart} from "@ducks/carts/actions";
import {useNavigate} from "react-router";
import {generatePath} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {selectCartHeaderById} from "@ducks/carts/selectors";

export interface DeleteCartButtonProps extends ButtonProps {
    customerKey: string | null;
    cartId: number;
}

export default function DeleteCartButton({
                                             customerKey,
                                             cartId,
                                             disabled, children, ...rest
                                         }: DeleteCartButtonProps) {
    const dispatch = useAppDispatch();
    const header = useAppSelector((state) => selectCartHeaderById(state, cartId));
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const confirmHandler = useCallback(async () => {
        if (!header || !customerKey) {
            return;
        }
        setBusy(true);
        await dispatch(removeCart({customerKey, cartId: header.id, salesOrderNo: header.salesOrderNo}));
        setOpen(false);
        setBusy(false);
        const path = generatePath('/account/:customerSlug/carts', {
            customerSlug: customerKey
        })
        navigate(path, {replace: true});
    }, [header, customerKey])

    const clickHandler = () => {
        setOpen(true);
    }

    const closeHandler = () => setOpen(false);

    if (!header || !customerKey) {
        return null;
    }

    return (
        <>
            <Button type="button" variant="text" color="error"
                    onClick={clickHandler} disabled={disabled} {...rest}>
                {children ?? 'Delete Cart'}
            </Button>
            <Dialog onClose={closeHandler} open={open} maxWidth="sm">
                <DialogTitle>Delete Cart #{header.id}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete cart <strong>{header.customerPONo}</strong>?
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
