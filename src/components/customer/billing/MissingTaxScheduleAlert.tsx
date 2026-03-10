import Alert from "@mui/material/Alert";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {useAppSelector} from "@/app/hooks";
import Box from "@mui/material/Box";
import useCustomer from "@/components/customer/hooks/useCustomer.ts";

export default function MissingTaxScheduleAlert() {
    const {customer, status} = useCustomer()
    const loggedIn = useAppSelector(selectLoggedIn);

    if (!customer || !loggedIn) {
        return null;
    }

    if (status !== 'idle' || !!customer.TaxSchedule) {
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

