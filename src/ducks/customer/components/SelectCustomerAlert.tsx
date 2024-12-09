import React from 'react';
import {Link as RoutedLink, useLocation} from "react-router";
import Alert from "@mui/material/Alert";
import Link from '@mui/material/Link';
import {useSelector} from "react-redux";
import {selectCustomerLoading} from "../selectors";
import {selectCurrentAccess, selectCurrentCustomer} from "@ducks/user/selectors";
import {useTheme} from "@mui/material/styles";

const SelectCustomerAlert = () => {
    const loading = useSelector(selectCustomerLoading);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const currentAccess = useSelector(selectCurrentAccess);
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
