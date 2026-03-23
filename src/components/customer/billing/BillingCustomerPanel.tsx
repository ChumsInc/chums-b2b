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
import useCustomer from "@/hooks/customer/useCustomer.ts";
import BillToSkeleton from "@/components/customer/billing/BillToSkeleton.tsx";
import BillToForm from "@/components/customer/billing/BillToForm.tsx";
import EditorProvider from "@/hooks/editor/EditorProvider.tsx";
import type {BillToCustomer} from "chums-types/b2b";

export default function BillingCustomerPanel() {
    const dispatch = useAppDispatch();
    const {customer, permissions, status} = useCustomer();
    const canEdit = useAppSelector(selectCanEdit);

    const submitHandler = (arg:BillToCustomer) => {
        dispatch(saveBillingAddress(arg))
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
                {status !== 'idle' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
                <Grid container spacing={2}>
                    <BillingCustomerAccountNumber customer={customer}/>
                    <BillingCustomerPaymentTerms customer={customer}/>
                </Grid>

                <MissingTaxScheduleAlert/>

                <hr/>
                <BillingCustomerAddressTitle customer={customer}/>

                <EditorProvider initialValue={customer}>
                    <BillToForm customer={customer} readOnly={!canEdit}
                                onSave={submitHandler}/>
                </EditorProvider>
            </div>
        </ErrorBoundary>
    )
}
