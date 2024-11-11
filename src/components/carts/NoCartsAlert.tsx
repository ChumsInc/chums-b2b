import React from 'react';
import {useSelector} from "react-redux";
import Alert from "@mui/material/Alert";
import {selectCartsList} from "@ducks/carts/selectors";

export default function NoCartsAlert() {
    const carts = useSelector(selectCartsList);
    if (carts.length > 0) {
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
