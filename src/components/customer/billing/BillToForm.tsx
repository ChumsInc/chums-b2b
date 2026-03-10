import {saveBillingAddress} from '@/ducks/customer/actions';
import MissingTaxScheduleAlert from "./MissingTaxScheduleAlert";
import {selectCanEdit} from "@/ducks/user/userProfileSlice";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import Address from "@/components/address/Address";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import BillingCustomerAddressTitle from "@/components/customer/billing/BillingCustomerAddressTitle.tsx";
import BillingCustomerAccountNumber from "@/components/customer/billing/BillingCustomerAccountNumber.tsx";
import BillingCustomerPaymentTerms from "@/components/customer/billing/BillingCustomerPaymentTerms.tsx";
import useCustomer from "@/components/customer/hooks/useCustomer.ts";
import BillToSkeleton from "@/components/customer/billing/BillToSkeleton.tsx";
import BillToFormUI from "@/components/customer/billing/BillToFormUI.tsx";
import {customerSlug} from "@/utils/customer.ts";

export default function BillToForm() {
    const dispatch = useAppDispatch();
    const {customer, permissions, status} = useCustomer();
    const canEdit = useAppSelector(selectCanEdit);

    const submitHandler = () => {
        if (!customer) {
            return;
        }
        dispatch(saveBillingAddress(customer))
    }

    if (!customer) {
        if (status === 'loading') {
            return (
                <BillToSkeleton/>
            )
        }
        return null;
    }

    if (!permissions?.billTo) {
        return (
            <div>
                <h4>Billing Address</h4>
                <Address address={customer}/>
            </div>
        )
    }

    return (
        <ErrorBoundary>
            <div>
                {status === 'loading' && <LinearProgress variant="indeterminate"/>}
                <Grid container spacing={2}>
                    <BillingCustomerAccountNumber customer={customer}/>
                    <BillingCustomerPaymentTerms customer={customer}/>
                </Grid>

                <MissingTaxScheduleAlert/>

                <hr/>
                <BillingCustomerAddressTitle customer={customer}/>

                <BillToFormUI key={customerSlug(customer)} customer={customer} readOnly={!canEdit}
                              onSave={submitHandler}/>
            </div>
        </ErrorBoundary>
    )
}
