import React from 'react';
import {useSelector} from 'react-redux';
import AccountUserTable from "./AccountUserTable";
import {selectCustomerKey, selectCustomerLoading} from "../selectors";
import LinearProgress from "@mui/material/LinearProgress";
import Grid2 from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountUserPermissions from "./AccountUserPermissions";
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/configureStore";
import {loadCustomerUsers} from "../actions";
import Button from "@mui/material/Button";

export default function AccountUsers() {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectCustomerLoading);
    const customerKey = useAppSelector(selectCustomerKey)

    const reloadHandler = () => {
        dispatch(loadCustomerUsers());
    }

    return (
        <Grid2 container spacing={2} sx={{mt: '2'}}>
            <Grid2 xs={12} sm={6}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="h3" component="h3">
                        User List
                    </Typography>
                    <Button type="button" variant="text" onClick={reloadHandler} disabled={loading || !customerKey}>
                        Reload
                    </Button>
                </Stack>
                {loading && <LinearProgress variant={"indeterminate"} sx={{my: 1}}/>}
                <AccountUserTable/>
            </Grid2>
            <Grid2 xs={12} sm={6}>
                <Outlet/>
                <Divider sx={{my: 3}}/>
                <AccountUserPermissions/>
            </Grid2>
        </Grid2>
    )
}
