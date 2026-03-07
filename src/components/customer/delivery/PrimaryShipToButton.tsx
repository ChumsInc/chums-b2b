import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Stack from "@mui/material/Stack";
import PrimaryShipToIcon from "../common/PrimaryShipToIcon";
import Typography from "@mui/material/Typography";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice";
import type {Editable, ShipToCustomer} from "chums-types/b2b";
import {setDefaultShipTo} from "@/ducks/customer/actions";
import {selectPrimaryShipToCode} from "@/ducks/customer/currentCustomerSlice.ts";


export interface PrimaryShipToButtonProps {
    shipTo: (ShipToCustomer & Editable) | null;
    disabled?: boolean;
}

const PrimaryShipToButton = ({shipTo, disabled}: PrimaryShipToButtonProps) => {
    const dispatch = useAppDispatch();
    const primaryShipToCode = useAppSelector(selectPrimaryShipToCode);
    const permissions = useAppSelector(selectCustomerPermissions);


    const onSetDefaultShipTo = async () => {
        if (permissions?.canSetDefaultShipTo && shipTo && shipTo.ShipToCode !== primaryShipToCode) {
            await dispatch(setDefaultShipTo(shipTo.ShipToCode))
        }
    }

    if (!shipTo) {
        return null;
    }

    return (
        <>
            {primaryShipToCode !== shipTo.ShipToCode && (
                <Button type="button" variant="outlined"
                        startIcon={<LocalShippingIcon/>}
                        disabled={!permissions?.canSetDefaultShipTo || shipTo.changed || disabled || shipTo.ShipToCode === primaryShipToCode || !permissions?.billTo}
                        onClick={onSetDefaultShipTo}>
                    Set as default delivery location
                </Button>
            )}
            {primaryShipToCode === shipTo.ShipToCode && (
                <Stack direction="row" spacing={2} alignItems="center">
                    <PrimaryShipToIcon shipToCode={shipTo.ShipToCode}/>
                    <Typography variant="body1">Default delivery location</Typography>
                </Stack>
            )}
        </>
    )
}

export default PrimaryShipToButton;
