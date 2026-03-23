import Button from "@mui/material/Button";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Stack from "@mui/material/Stack";
import PrimaryShipToIcon from "../common/PrimaryShipToIcon";
import Typography from "@mui/material/Typography";
import {useAppDispatch} from "@/app/hooks";
import type {ShipToCustomer} from "chums-types/b2b";
import {setDefaultShipTo} from "@/ducks/customer/actions";
import useCustomer from "@/hooks/customer/useCustomer.ts";


export interface PrimaryShipToButtonProps {
    shipTo: ShipToCustomer|null;
    disabled?: boolean;
}

export default function PrimaryShipToButton({shipTo, disabled}: PrimaryShipToButtonProps) {
    const dispatch = useAppDispatch();
    const {customer, permissions} = useCustomer();

    const primaryShipToCode = customer?.PrimaryShipToCode ?? null;
    const canSetDefaultShipTo = (permissions?.canSetDefaultShipTo ?? false)
        && (permissions?.billTo ?? false)
        && !disabled
        && shipTo?.ShipToCode !== primaryShipToCode;

    const onSetDefaultShipTo = async () => {
        if (!customer || !permissions?.canSetDefaultShipTo || disabled) {
            return
        }
        if (shipTo?.ShipToCode !== primaryShipToCode) {
            await dispatch(setDefaultShipTo(shipTo?.ShipToCode ?? null))
        }
    }

    if (!shipTo || !customer) {
        return null;
    }

    return (
        <>
            {primaryShipToCode !== shipTo.ShipToCode && (
                <Button type="button" variant="outlined"
                        startIcon={<LocalShippingIcon/>}
                        disabled={!canSetDefaultShipTo}
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
