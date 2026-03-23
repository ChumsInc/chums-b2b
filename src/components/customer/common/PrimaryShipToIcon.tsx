import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Tooltip from "@mui/material/Tooltip";
import useCustomer from "@/hooks/customer/useCustomer.ts";

const PrimaryShipToIcon = ({shipToCode}: { shipToCode: string | null }) => {
    const {customer} = useCustomer()
    const primaryShipToCode = customer?.PrimaryShipToCode ?? null;
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
