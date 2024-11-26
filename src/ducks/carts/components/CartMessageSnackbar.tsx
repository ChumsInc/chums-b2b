import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {selectCartMessages} from "@ducks/carts/selectors";
import {clearCartMessages} from "@ducks/carts/actions";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {SnackbarCloseReason} from "@mui/base";
import {CartMessage} from "@typeDefs/cart/cart-utils";

export default function CartMessageSnackbar() {
    const dispatch = useAppDispatch();
    const messages = useAppSelector(selectCartMessages);
    const [open, setOpen] = useState(false);
    const [snacks, setSnacks] = useState<CartMessage[]>(messages);
    const [message, setMessage] = useState<CartMessage | null>(snacks[0] ?? null);

    useEffect(() => {
        setSnacks(messages);
    }, [messages]);

    useEffect(() => {
        if (snacks.length && !message) {
            setMessage(snacks[0] ?? null);
            setSnacks((messages) => messages.slice(1));
            setOpen(true);
        } else if (snacks.length && message && open) {
            setOpen(false);
        }
    }, [snacks, message, open]);

    const handleClose = (ev: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        dispatch(clearCartMessages());
    }

    const handleExited = () => {
        setOpen(false);
        setMessage(null);
    }

    return (
        <Snackbar open={open} autoHideDuration={5000}
                  onClose={handleClose} TransitionProps={{onExited: handleExited}}
                  message={message?.message ?? null}
                  action={(
                      <IconButton aria-label="close" color="inherit" sx={{p: 0.5}} onClick={handleClose}>
                          <CloseIcon/>
                      </IconButton>
                  )}
        />
    )
}
