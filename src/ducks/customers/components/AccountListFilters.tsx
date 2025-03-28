import Grid from "@mui/material/Grid2";
import React from "react";
import {loadCustomerList} from "../actions";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@/app/configureStore";
import {selectCanFilterReps, selectCurrentUserAccount} from "../../user/selectors";
import Button from "@mui/material/Button";
import AccountListCustomerFilter from "./AccountListCustomerFilter";
import AccountListRepFilter from "./AccountListRepFilter";
import AccountListStateFilter from "./AccountListStateFilter";
import {selectCustomerStates} from "../selectors";

const AccountListFilters = () => {
    const dispatch = useAppDispatch();
    const userAccount = useSelector(selectCurrentUserAccount);
    const allowSelectReps = useSelector(selectCanFilterReps);
    const statesList = useSelector(selectCustomerStates);

    const reloadHandler = () => {
        dispatch(loadCustomerList(userAccount));
    }

    return (
        <Grid container spacing={2} alignContent="center" sx={{mt: 5, mb: 1}} justifyContent="space-between">
            <Grid sx={{flex: '1 1 auto'}}>
                <AccountListCustomerFilter/>
            </Grid>
            {allowSelectReps && (
                <Grid sx={{flex: '1 1 auto'}}>
                    <AccountListRepFilter/>
                </Grid>
            )}
            {statesList.length > 1 && (
                <Grid sx={{flex: '1 1 auto'}}>
                    <AccountListStateFilter/>
                </Grid>
            )}
            <Grid size="auto">
                <Button variant="contained" onClick={reloadHandler}>Refresh List</Button>
            </Grid>
        </Grid>
    )
}

export default AccountListFilters;
