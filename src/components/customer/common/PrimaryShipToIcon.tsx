import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Tooltip from "@mui/material/Tooltip";
import {useAppSelector} from "@/app/hooks";
import {selectPrimaryShipToCode} from "@/ducks/customer/currentCustomerSlice.ts";

const PrimaryShipToIcon = ({shipToCode}: { shipToCode: string | null }) => {
    const primaryShipToCode = useAppSelector(selectPrimaryShipToCode);
    if (shipToCode !== primaryShipToCode) {
        return null;
    }

    return (
        <Tooltip title="Default Ship-To Location">
            <LocalShippingIcon/>
        </Tooltip>
    )
}

export default PrimaryShipToIcon;
