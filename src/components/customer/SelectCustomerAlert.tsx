import {Link as RoutedLink, useLocation} from "react-router";
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import {selectCustomerKey, selectCustomerLoading} from "@/ducks/customer/selectors.ts";
import {useTheme} from "@mui/material/styles";
import {useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice.ts";

const SelectCustomerAlert = () => {
    const loading = useAppSelector(selectCustomerLoading);
    const currentCustomer = useAppSelector(selectCustomerKey);
    const currentAccess = useAppSelector(selectCurrentAccess);
    const theme = useTheme();
    const location = useLocation()

    if (currentCustomer || loading) {
        return null;
    }

    const path = currentAccess ? `/profile/${currentAccess.id}` : '/profile';
    return (
        <Alert severity="warning">
            <Link component={RoutedLink} to={path} state={{returnTo: location.pathname}}
                  sx={{color: theme.palette.warning.main}}>Please select a customer.</Link>
        </Alert>
    )
}

export default SelectCustomerAlert;
