import CustomerUserTable from "./CustomerUserTable.tsx";
import {selectCustomerKey, selectCustomerLoading} from "@/ducks/customer/selectors.ts";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountUserPermissions from "./AccountUserPermissions.tsx";
import {Outlet} from "react-router";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {loadCustomerUsers} from "@/ducks/customer/actions.ts";
import Button from "@mui/material/Button";
import {selectCustomerUsersStatus} from "@/ducks/customer/customerUsersSlice.ts";

export default function CustomerUsers() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectCustomerUsersStatus);
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
                    <Button type="button" variant="text" onClick={reloadHandler} disabled={status !== 'idle' || !customerKey}>
                        Reload
                    </Button>
                </Stack>
                {!['idle', 'rejected'].includes(status) && <LinearProgress variant={"indeterminate"} sx={{my: 1}}/>}
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
