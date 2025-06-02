import React from "react";
import {selectPrimaryShipTo} from "../selectors";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Tooltip from "@mui/material/Tooltip";
import {useAppSelector} from "@/app/configureStore";

const PrimaryShipToIcon = ({shipToCode}: { shipToCode: string | null }) => {
    const primaryShipTo = useAppSelector(selectPrimaryShipTo);
    if (shipToCode !== primaryShipTo?.ShipToCode) {
        return null;
    }

    return (
        <Tooltip title="Default Ship-To Location">
            <LocalShippingIcon/>
        </Tooltip>
    )
}

export default PrimaryShipToIcon;
