import React, {useState} from 'react';
import Button, {ButtonProps} from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {removeCart} from "@ducks/b2b-cart/actions";
import {useNavigate} from "react-router";
import {generatePath} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {selectCartHeader} from "@ducks/b2b-cart/selectors";
import {selectCustomerKey} from "@ducks/customer/selectors";

export default function DeleteCartButton({disabled, children, ...rest}: ButtonProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const header = useAppSelector(selectCartHeader);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);

    const clickHandler = () => {
        setOpen(true);
    }
    const closeHandler = () => setOpen(false);

    const confirmHandler = async () => {
        if (!header || !customerKey) {
            return;
        }
        setBusy(true);
        await dispatch(removeCart({customerKey, cartId: header.id}));
        setOpen(false);
        setBusy(false);
        const path = generatePath('/account/:customerSlug/carts', {
            customerSlug: customerKey
        })
        navigate(path);
    }

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
