import Alert from "@mui/material/Alert";
import {
    selectCustomerAccount,
    selectCustomerLoaded,
    selectCustomerLoadStatus
} from "@/ducks/customer/currentCustomerSlice";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {useAppSelector} from "@/app/hooks";
import Box from "@mui/material/Box";

const MissingTaxScheduleAlert = () => {
    const customer = useAppSelector(selectCustomerAccount);
    const loading = useAppSelector(selectCustomerLoadStatus);
    const loaded = useAppSelector(selectCustomerLoaded);
    const loggedIn = useAppSelector(selectLoggedIn);

    if (!customer || !loggedIn) {
        return null;
    }

    if (!loaded || loading !== 'idle' || !!customer.TaxSchedule) {
        return null;
    }

    return (
        <Alert severity="error" sx={{my: 0.5}}>
            <Box sx={{mr: 1}} component="strong">Warning:</Box>
            Missing Tax Schedule. Please contact {' '}
            <a
                href={`mailto:cs@chums.com?subject=${customer.ARDivisionNo}-${customer.CustomerNo}${encodeURIComponent(' Missing Tax Schedule (B2B)')}`}
                rel="noreferrer"
                target="_blank">customer service.</a>
        </Alert>
    )
}
export default MissingTaxScheduleAlert;
