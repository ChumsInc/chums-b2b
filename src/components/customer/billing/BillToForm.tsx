import {type ChangeEvent} from 'react';
import AddressFormFields from '../../address/AddressFormFields';
import Alert from "@mui/material/Alert";
import StoreMapToggle from "../common/StoreMapToggle";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import type {BillToCustomer} from "chums-types/b2b";
import ReloadCustomerButton from "../common/ReloadCustomerButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TelephoneFormFields from "../common/TelephoneFormFields";
import Button from "@mui/material/Button";
import BillingEmailFields from "@/components/customer/billing/BillingEmailFields.tsx";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";
import PrimaryShipToButton from "@/components/customer/delivery/PrimaryShipToButton.tsx";

export interface BillToFormProps {
    customer: BillToCustomer;
    readOnly?: boolean;
    onSave: (arg: BillToCustomer) => void;
}

export default function BillToForm({readOnly, onSave}: BillToFormProps) {
    const {value, updateValue, changed} = useEditorContext<BillToCustomer>();
    const {customer, status} = useCustomer();

    const changeHandler = (arg: Partial<BillToCustomer>) => {
        if (value) {
            updateValue(arg);
        }
    }

    const fieldChangeHandler = (field: keyof BillToCustomer) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'Reseller':
                changeHandler({[field]: ev.target.checked ? 'Y' : 'N'})
                return
            default:
                changeHandler(({[field]: ev.target.value}));
        }
    }

    const submitHandler = () => {
        if (!value) {
            return;
        }
        onSave(value);
    }

    if (!customer || !value) {
        return null;
    }

    return (
        <ErrorBoundary>
            <form action={submitHandler}>
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6}}>
                        <AddressFormFields address={value} addressType="billing"
                                           readOnly={readOnly}
                                           onChange={changeHandler}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        <PrimaryShipToButton shipTo={null} disabled={readOnly || changed}/>
                        <Stack direction="column" spacing={1}>
                            <StoreMapToggle checked={value.Reseller === 'Y'}
                                            onChange={fieldChangeHandler('Reseller')}
                                            readOnly={readOnly}/>
                            <BillingEmailFields/>
                            <TelephoneFormFields account={value} onChange={changeHandler} readOnly={readOnly}/>
                            {changed && status !== 'saving' &&
                                <Alert severity="warning" title="Hey!">Don&#39;t forget to save your
                                    changes.</Alert>
                            }
                            <Stack direction="row" spacing={2} sx={{my: 3}} justifyContent="flex-end">
                                <ReloadCustomerButton/>
                                <Button type="submit" variant="contained" disabled={readOnly || status !== 'idle'}>
                                    Save
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </ErrorBoundary>
    )
}
