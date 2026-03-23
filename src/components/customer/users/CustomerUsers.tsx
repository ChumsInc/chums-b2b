import CustomerUserTable from "./CustomerUserTable";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AccountUserPermissions from "./AccountUserPermissions";
import {Outlet} from "react-router";
import {useAppSelector} from "@/app/hooks";
import Button from "@mui/material/Button";
import {selectCustomerUsersStatus} from "@/ducks/customer/customerUsersSlice";
import useCustomer from "@/hooks/customer/useCustomer.ts";

export default function CustomerUsers() {
    const status = useAppSelector(selectCustomerUsersStatus);
    const customerKey = useAppSelector(selectCustomerKey)
    const {reloadCustomer} = useCustomer();

    const reloadHandler = () => {
        reloadCustomer()
    }

    return (
        <Grid container spacing={2} sx={{mt: '2'}}>
            <Grid size={{xs: 12, sm: 6}}>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Typography variant="h3" component="h3">
                        User List
                    </Typography>
                    <Button type="button" variant="text" onClick={reloadHandler}
                            disabled={status !== 'idle' || !customerKey}>
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
