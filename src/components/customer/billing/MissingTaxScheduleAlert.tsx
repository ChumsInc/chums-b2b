import Alert from "@mui/material/Alert";
import {selectCustomerAccount, selectCustomerLoaded, selectCustomerLoading} from "@/ducks/customer/selectors";
import {selectLoggedIn} from "@/ducks/user/selectors";
import {useAppSelector} from "@/app/configureStore";

const MissingTaxScheduleAlert = () => {
    const customer = useAppSelector(selectCustomerAccount);
    const loading = useAppSelector(selectCustomerLoading);
    const loaded = useAppSelector(selectCustomerLoaded);
    const loggedIn = useAppSelector(selectLoggedIn);

    if (!customer) {
        return null;
    }

    if (!loggedIn || !loaded || loading || !!customer?.TaxSchedule) {
        return null;
    }

    return (
        <Alert severity="error">
            <strong className="me-1">Warning:</strong>
            Missing Tax Schedule. Please contact
            <a
                href={`mailto:cs@chums.com?subject=${customer.ARDivisionNo}-${customer.CustomerNo}${encodeURIComponent(' Missing Tax Schedule (B2B)')}`}
                rel="noreferrer"
                target="_blank">customer service.</a>
        </Alert>
    )
}
export default MissingTaxScheduleAlert;
