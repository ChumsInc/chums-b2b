import {type ChangeEvent, type  FormEvent, useEffect, useState} from 'react';
import AddressFormFields from '../../address/AddressFormFields';
import {saveBillingAddress} from '@/ducks/customer/actions';
import Alert from "@mui/material/Alert";
import MissingTaxScheduleAlert from "./MissingTaxScheduleAlert";
import {selectCustomerAccount, selectCustomerLoadStatus} from "@/ducks/customer/currentCustomerSlice";
import {selectCanEdit} from "@/ducks/user/userProfileSlice";
import StoreMapToggle from "../common/StoreMapToggle";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {isBillToCustomer} from "@/utils/typeguards";
import Address from "@/components/address/Address";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import type {BillToCustomer, Editable} from "chums-types/b2b";
import LinearProgress from "@mui/material/LinearProgress";
import ReloadCustomerButton from "../common/ReloadCustomerButton";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TelephoneFormFields from "../common/TelephoneFormFields";
import Button from "@mui/material/Button";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice";
import BillingCustomerAddressTitle from "@/components/customer/billing/BillingCustomerAddressTitle.tsx";
import BillingCustomerAccountNumber from "@/components/customer/billing/BillingCustomerAccountNumber.tsx";
import BillingCustomerPaymentTerms from "@/components/customer/billing/BillingCustomerPaymentTerms.tsx";
import BillingEmailFields from "@/components/customer/billing/BillingEmailFields.tsx";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const BillToForm = () => {
    const dispatch = useAppDispatch();
    const current = useAppSelector(selectCustomerAccount);
    const loading = useAppSelector(selectCustomerLoadStatus);
    const canEdit = useAppSelector(selectCanEdit);
    const permissions = useAppSelector(selectCustomerPermissions);
    const [customer, setCustomer] = useState<(BillToCustomer & Editable) | null>(current ?? null);

    useEffect(() => {
        if (isBillToCustomer(current)) {
            setCustomer({...current});
        } else {
            setCustomer(null);
        }
    }, [current])

    const changeHandler = (arg: Partial<BillToCustomer>) => {
        if (customer) {
            setCustomer({...customer, ...arg, changed: true});
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

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!customer) {
            return;
        }
        dispatch(saveBillingAddress(customer))
    }

    if (!current || !customer) {
        if (loading === 'loading') {
            return (
                <div>
                    <Typography variant="h1">
                        <Skeleton variant="text" />
                    </Typography>
                    <LinearProgress variant="indeterminate"/>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Skeleton variant="rectangular" height={23} width="100%" />
                        </Grid>
                    </Grid>
                </div>
            )
        }
        return null;
    }

    if (!permissions?.billTo) {
        return (
            <div>
                <h4>Billing Address</h4>
                <Address address={current}/>
            </div>
        )
    }

    return (
        <ErrorBoundary>
            <div>
                {loading === 'loading' && <LinearProgress variant="indeterminate"/>}
                <Grid container spacing={2}>
                    <BillingCustomerAccountNumber customer={customer}/>
                    <BillingCustomerPaymentTerms customer={customer}/>
                </Grid>

                <MissingTaxScheduleAlert/>

                <hr/>
                <BillingCustomerAddressTitle customer={customer}/>

                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <AddressFormFields address={customer} addressType="billing"
                                               readOnly={!canEdit}
                                               onChange={changeHandler}/>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Stack direction="column" spacing={1}>
                                <StoreMapToggle checked={customer.Reseller === 'Y'}
                                                onChange={fieldChangeHandler('Reseller')}
                                                readOnly={!canEdit}/>
                                <BillingEmailFields onChange={changeHandler}/>
                                <TelephoneFormFields account={customer} onChange={changeHandler} readOnly={!canEdit}/>
                                {customer.changed &&
                                    <Alert severity="warning" title="Hey!">Don&#39;t forget to save your
                                        changes.</Alert>
                                }
                                <Stack direction="row" spacing={2} sx={{my: 3}} justifyContent="flex-end">
                                    <ReloadCustomerButton/>
                                    <Button type="submit" variant="contained" disabled={!canEdit || loading !== 'idle'}>
                                        Save
                                    </Button>
                                </Stack>

                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </ErrorBoundary>

    )
}

export default BillToForm;
