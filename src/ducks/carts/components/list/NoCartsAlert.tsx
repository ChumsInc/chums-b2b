import React from 'react';
import Alert from "@mui/material/Alert";
import {selectCartsLength} from "@ducks/carts/cartHeadersSlice";
import {useAppSelector} from "@app/configureStore";

export default function NoCartsAlert() {
    const length = useAppSelector(selectCartsLength);
    if (length > 0) {
        return (
            <Alert severity="info">
                <strong className="me-1">Hint:</strong>
                Select a cart icon to make it your current cart.
            </Alert>
        );
    }
    return (
        <Alert severity="info">You current have no open carts.</Alert>
    )
}
