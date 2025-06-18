import React from 'react';
import {useSelector} from 'react-redux';
import CustomerUserTable from "./CustomerUserTable";
import {selectCustomerKey, selectCustomerLoading} from "../selectors";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountUserPermissions from "./AccountUserPermissions";
import {Outlet} from "react-router";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadCustomerUsers} from "../actions";
import Button from "@mui/material/Button";

export default function CustomerUsers() {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectCustomerLoading);
    const customerKey = useAppSelector(selectCustomerKey)

    const reloadHandler = () => {
        dispatch(loadCustomerUsers());
    }

    return (
        <Grid container spacing={2} sx={{mt: '2'}}>
            <Grid size={{xs: 12, sm: 6}}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="h3" component="h3">
                        User List
                    </Typography>
                    <Button type="button" variant="text" onClick={reloadHandler} disabled={loading || !customerKey}>
                        Reload
                    </Button>
                </Stack>
                {loading && <LinearProgress variant={"indeterminate"} sx={{my: 1}}/>}
                <CustomerUserTable/>
            </Grid>
            <Grid size={{xs: 12, sm: 6}}>
                <Outlet/>
                <Divider sx={{my: 3}}/>
                <AccountUserPermissions/>
            </Grid>
        </Grid>
    )
}
