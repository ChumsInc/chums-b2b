import {type SyntheticEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {clearCartMessages, selectCartMessages} from "@/ducks/carts/cartMessagesSlice";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import type {CartMessage} from "@/types/cart/cart-utils";

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

    const handleClose = (_: SyntheticEvent | Event, reason?: string) => {
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
                  onClose={handleClose}
                  slotProps={{transition: {onExited: handleExited}}}
                  message={message?.message ?? null}
                  action={(
                      <IconButton aria-label="close" color="inherit" sx={{p: 0.5}} onClick={handleClose}>
                          <CloseIcon/>
                      </IconButton>
                  )}
        />
    )
}
