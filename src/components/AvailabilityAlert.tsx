import React from 'react';
import AppAlert from "../common-components/AppAlert";
import Decimal from "decimal.js";
import {B2BCartSeason} from "@typeDefs/cart/cart-detail";
import Alert from "@mui/material/Alert";

import NewReleasesIcon from '@mui/icons-material/NewReleases';
import {selectCanViewAvailable} from "@ducks/user/selectors";
import {useAppSelector} from "@app/configureStore";

const AvailabilityAlert = ({quantityOrdered, quantityAvailable, season}: {
    quantityOrdered: string | number;
    quantityAvailable: string | number | null;
    season?: B2BCartSeason;
}) => {
    const canViewAvailable = useAppSelector(selectCanViewAvailable);
    const available = new Decimal(quantityAvailable ?? 0);
    const ordered = new Decimal(quantityOrdered);
    if (season && season.active && !season.available) {
        return (<Alert severity="info" icon={<NewReleasesIcon />}>Pre-season Item</Alert>)
    }
    if (available.gte(ordered)) {
        return null;
    }

    if (available.lte(0) || !canViewAvailable) {
        return (<AppAlert severity="warning" alertTitle={"Note:"}>Not available for immediate delivery.</AppAlert>)
    }

    const message = `Only ${available} ${available.eq(1) ? 'is' : 'are'} available for immediate delivery`;
    return (<AppAlert severity="warning" message={message} alertTitle="Note:"/>)
};


export default AvailabilityAlert;
