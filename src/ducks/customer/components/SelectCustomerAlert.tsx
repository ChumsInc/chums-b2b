import React from 'react';
import {Link} from "react-router-dom";
import Alert from "@mui/material/Alert";
import {useSelector} from "react-redux";
import {selectCustomerLoading} from "../selectors";
import {selectCurrentCustomer} from "../../user/selectors";

const SelectCustomerAlert = () => {
    const loading = useSelector(selectCustomerLoading);
    const currentCustomer = useSelector(selectCurrentCustomer);

    if (currentCustomer || loading) {
        return null;
    }
    return (
        <Alert severity="warning">
            <Link to="/profile">Please select a customer.</Link>
        </Alert>
    )
}

export default SelectCustomerAlert;