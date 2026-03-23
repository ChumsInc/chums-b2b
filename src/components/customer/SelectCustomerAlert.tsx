import {Link as RoutedLink, useLocation} from "react-router";
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import {useTheme} from "@mui/material/styles";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useProfile} from "@/hooks/profile-provider/use-profile-hook.ts";

const SelectCustomerAlert = () => {
    const {customer} = useCustomer();
    const {currentAccess} = useProfile()
    const theme = useTheme();
    const location = useLocation()

    if (customer) {
        return null;
    }

    const path = currentAccess ? `/profile/${currentAccess.id}` : '/profile';
    return (
        <Alert severity="warning" sx={{my: 0.5}}>
            <Link component={RoutedLink} to={path} state={{returnTo: location.pathname}}
                  sx={{color: theme.palette.warning.main}}>Please select a customer.</Link>
        </Alert>
    )
}

export default SelectCustomerAlert;
