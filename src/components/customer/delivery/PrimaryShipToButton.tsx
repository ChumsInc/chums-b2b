import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Stack from "@mui/material/Stack";
import PrimaryShipToIcon from "../common/PrimaryShipToIcon.tsx";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice.ts";
import type {Editable, ShipToCustomer} from "b2b-types";
import {loadCustomer, setDefaultShipTo} from "@/ducks/customer/actions.ts";
import {selectPrimaryShipTo} from "@/ducks/customer/selectors.ts";


export interface PrimaryShipToButtonProps {
    shipTo: (ShipToCustomer & Editable) | null;
    disabled?: boolean;
}

const PrimaryShipToButton = ({shipTo, disabled}: PrimaryShipToButtonProps) => {
    const dispatch = useAppDispatch();
    const primaryShipTo = useAppSelector(selectPrimaryShipTo);
    const permissions = useAppSelector(selectCustomerPermissions);

    const onSetDefaultShipTo = async () => {
        if (permissions?.canSetDefaultShipTo && shipTo && shipTo.ShipToCode !== primaryShipTo?.ShipToCode) {
            await dispatch(setDefaultShipTo(shipTo.ShipToCode))
            dispatch(loadCustomer(shipTo));
        }
    }

    if (!shipTo) {
        return null;
    }

    return (
        <>
            {primaryShipTo?.ShipToCode !== shipTo.ShipToCode && (
                <Button type="button" variant="outlined"
                        startIcon={<LocalShippingIcon/>}
                        disabled={!permissions?.canSetDefaultShipTo || shipTo.changed || disabled || shipTo.ShipToCode === primaryShipTo?.ShipToCode || !permissions?.billTo}
                        onClick={onSetDefaultShipTo}>
                    Set as default delivery location
                </Button>
            )}
            {primaryShipTo?.ShipToCode === shipTo.ShipToCode && (
                <Stack direction="row" spacing={2} alignItems="center">
                    <PrimaryShipToIcon shipToCode={shipTo.ShipToCode}/>
                    <Typography variant="body1">Default delivery location</Typography>
                </Stack>
            )}
        </>
    )
}

export default PrimaryShipToButton;
