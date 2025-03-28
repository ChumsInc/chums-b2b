/**
 * Created by steve on 9/6/2016.
 */
import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import AddressFormFields from '../../../components/AddressFormFields';
import {filteredTermsCode} from '@/constants/account';
import {useSelector} from "react-redux";
import {longCustomerNo} from "@/utils/customer";
import {saveBillingAddress} from '../actions';
import Alert from "@mui/material/Alert";
import MissingTaxScheduleAlert from "./MissingTaxScheduleAlert";
import {selectCustomerAccount, selectCustomerLoading, selectCustomerPermissions} from "../selectors";
import {selectCanEdit} from "../../user/selectors";
import StoreMapToggle from "../../../components/StoreMapToggle";
import ErrorBoundary from "../../../common-components/ErrorBoundary";
import {isBillToCustomer} from "@/utils/typeguards";
import Address from "../../../components/Address/Address";
import {useAppDispatch} from "@/app/configureStore";
import {BillToCustomer, Editable} from "b2b-types";
import LinearProgress from "@mui/material/LinearProgress";
import ReloadCustomerButton from "./ReloadCustomerButton";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TelephoneFormFields from "./TelephoneFormFields";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const BillToForm = () => {
    const dispatch = useAppDispatch();
    const current = useSelector(selectCustomerAccount);
    const loading = useSelector(selectCustomerLoading);
    const canEdit = useSelector(selectCanEdit);
    const permissions = useSelector(selectCustomerPermissions);
    const [customer, setCustomer] = useState<(BillToCustomer & Editable) | null>(current ?? null);
    const [emailAddresses, setEmailAddresses] = useState<string[]>(current?.EmailAddress?.split(';')?.map(email => email.trim()) ?? [''])

    useEffect(() => {
        if (isBillToCustomer(current)) {
            setCustomer({...current});
            setEmailAddresses(current?.EmailAddress?.split(';')?.map(email => email.trim()) ?? ['']);
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
                return changeHandler({[field]: ev.target.checked ? 'Y' : 'N'})
            default:
                changeHandler(({[field]: ev.target.value}));
        }
    }

    const emailChangeHandler = (index: number) => (ev: ChangeEvent<HTMLInputElement>) => {
        if (!customer) {
            return;
        }
        const email = [...emailAddresses];
        if (email[index] !== undefined) {
            email[index] = ev.target.value;
        }
        setEmailAddresses(email);
        setCustomer({...customer, EmailAddress: email.join(';')});
    }

    const addEmailAddressHandler = (after: number) => {
        if (!customer) {
            return;
        }
        const email = emailAddresses.toSpliced(after + 1, 0, '');
        setEmailAddresses(email);
        setCustomer({...customer, EmailAddress: email.join(';')});
    }

    const removeEmailAddressHandler = (index: number) => {
        if (!customer) {
            return;
        }
        if (emailAddresses[index] !== undefined) {
            const email = emailAddresses.filter((email, _index) => _index !== index);
            if (email.length === 0) {
                email.push('');
            }
            setEmailAddresses(email);
            setCustomer({...customer, EmailAddress: email.join(';')});
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
                {loading && <LinearProgress variant="indeterminate"/>}
                <Grid container spacing={2}>
                    <Grid size={{xs: 12, sm: 6}}>
                        <TextField variant="filled" label="Account Number" fullWidth size="small"
                                   type="text" value={longCustomerNo(customer) || ''}
                                   slotProps={{
                                       htmlInput: {readOnly: true}
                                   }}/>
                    </Grid>
                    <Grid size={{xs: 12, sm: 6}}>
                        {customer.ParentCustomerNo && (
                        <>
                            <Typography variant="subtitle1" component="h3">
                                Billing Customer
                            </Typography>
                            <Box sx={{mb: 1}}>
                                <Typography variant="h5" sx={{display: 'inline', mr: 3}}>{customer.ParentDivisionNo}-{customer.ParentCustomerNo}</Typography>
                                <Typography variant="h5" sx={{display: 'inline', fontWeight: 300}}>{customer.ParentCustomerName}</Typography>
                            </Box>
                            <Address address={{
                                CustomerName: '',
                                AddressLine1: customer.ParentAddressLine1 ?? '',
                                AddressLine2: customer.ParentAddressLine2 ?? '',
                                AddressLine3: customer.ParentAddressLine3 ?? '',
                                City: customer.ParentCity ?? '',
                                State: customer.ParentState ?? '',
                                ZipCode: customer.ParentZipCode ?? '',
                                CountryCode: customer.ParentCountryCode ?? '',
                            }}/>
                        </>
                        )}
                        {!customer.ParentCustomerNo && (
                            <TextField variant="filled" label="Payment Terms" fullWidth size="small"
                                       type="text" value={filteredTermsCode(customer.TermsCode)?.description ?? ''}
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}
                            />
                        )}
                    </Grid>
                </Grid>

                {!customer.TaxSchedule && (<MissingTaxScheduleAlert/>)}
                <hr/>
                <Typography variant="h3" component="h3">
                    {customer.ParentCustomerNo && (
                        <span>Sold-To Contact &amp; Address</span>
                    )}
                    {!customer.ParentCustomerNo && (
                        <span>Billing Contact &amp; Address</span>
                    )}
                </Typography>

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
                                {emailAddresses.map((email, index) => (
                                    <TextField key={index} variant="filled" label="Email Address" fullWidth size="small"
                                               type="email" value={email} onChange={emailChangeHandler(index)}
                                               slotProps={{
                                                   htmlInput: {
                                                       readOnly: !canEdit,
                                                       maxLength: 250 - emailAddresses.join(';').length
                                                   },
                                                   input: {
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <IconButton aria-label="Add a new email address"
                                                                           disabled={!email || emailAddresses.join(';').length > 240}
                                                                           onClick={() => addEmailAddressHandler(index)}>
                                                                   <AddIcon/>
                                                               </IconButton>
                                                               <IconButton aria-label="Add a new email address"
                                                                           onClick={() => removeEmailAddressHandler(index)}
                                                                           disabled={index === 0}>
                                                                   <RemoveIcon/>
                                                               </IconButton>
                                                           </InputAdornment>
                                                       )
                                                   }
                                               }}
                                    />
                                ))}
                                <TelephoneFormFields account={customer} onChange={changeHandler} readOnly={!canEdit}/>
                                {customer.changed &&
                                    <Alert severity="warning" title="Hey!">Don&#39;t forget to save your
                                        changes.</Alert>
                                }
                                <Stack direction="row" spacing={2} sx={{my: 3}} justifyContent="flex-end">
                                    <ReloadCustomerButton/>
                                    <Button type="submit" variant="contained" disabled={!canEdit || loading}>
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
