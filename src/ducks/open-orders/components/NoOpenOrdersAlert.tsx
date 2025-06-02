import React from "react";
import {selectOpenOrdersLength} from "../selectors";
import Alert from "@mui/material/Alert";
import {useAppSelector} from "@/app/configureStore";

export default function NoOpenOrdersAlert() {
    const length = useAppSelector(selectOpenOrdersLength);
    if (length > 0) {
        return null;
    }
    return (
        <Alert severity="info">There are currently no open orders.</Alert>
    )
}
