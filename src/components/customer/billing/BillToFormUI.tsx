import {type ChangeEvent, useCallback, useState} from 'react';
import AddressFormFields from '../../address/AddressFormFields';
import Alert from "@mui/material/Alert";
import StoreMapToggle from "../common/StoreMapToggle";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {isBillToCustomer} from "@/utils/typeguards";
import type {BillToCustomer} from "chums-types/b2b";
import ReloadCustomerButton from "../common/ReloadCustomerButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TelephoneFormFields from "../common/TelephoneFormFields";
import Button from "@mui/material/Button";
import BillingEmailFields from "@/components/customer/billing/BillingEmailFields.tsx";
import isEqual from "fast-deep-equal";
import useCustomer from "@/components/customer/hooks/useCustomer.ts";

export interface BillToFormUIProps {
    customer: BillToCustomer;
    readOnly?: boolean;
    onSave: (arg: BillToCustomer) => void;
}

export default function BillToFormUI({customer, readOnly, onSave}: BillToFormUIProps) {
    const {status} = useCustomer();
    const [value, setValue] = useState<BillToCustomer | null>(isBillToCustomer(customer) ? customer : null);
    const isChanged = useCallback((val: BillToCustomer | null) => {
        if (!val) {
            return false;
        }
        return isEqual(val, customer)
    }, [customer]);

    const changeHandler = (arg: Partial<BillToCustomer>) => {
        if (value) {
            setValue({...value, ...arg});
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
                        <Stack direction="column" spacing={1}>
                            <StoreMapToggle checked={value.Reseller === 'Y'}
                                            onChange={fieldChangeHandler('Reseller')}
                                            readOnly={readOnly}/>
                            <BillingEmailFields onChange={changeHandler}/>
                            <TelephoneFormFields account={value} onChange={changeHandler} readOnly={readOnly}/>
                            {isChanged(value) &&
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
