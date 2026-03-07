import {selectCustomerAccount,} from "@/ducks/customer/currentCustomerSlice";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import {customerNo} from "@/utils/customer";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "@/app/hooks";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice";

export default function CustomerIndicator() {
    const customer = useAppSelector(selectCustomerAccount);
    const currentShipTo = useAppSelector(selectCustomerShipTo);

    if (!customer) {
        return null;
    }

    return (
        <Tooltip title={(
            <>
                <Typography color="inherit" component="div">{customer.CustomerName}</Typography>
                {currentShipTo &&
                    <Typography color="inherit" sx={{fontSize: 'small'}}>{currentShipTo.ShipToName}</Typography>}
            </>
        )} arrow>
            <Box sx={{mx: 1, whiteSpace: 'pre'}}>
                {customerNo(customer)}
                {!!currentShipTo && <span>/{currentShipTo.ShipToCode}</span>}
            </Box>
        </Tooltip>
    )
}
