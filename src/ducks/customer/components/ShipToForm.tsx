import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {saveShipToAddress, setShipToCode} from '../actions';
import Alert from "@mui/material/Alert";
import ShipToAddressFormFields from "./ShipToAddressFormFields";
import {selectCanEdit} from "@/ducks/user/selectors";
import {selectCustomerLoading, selectPermittedBillToAddress, selectPermittedShipToAddresses} from "../selectors";
import StoreMapToggle from "@/components/StoreMapToggle";
import {Editable, ShipToCustomer} from "b2b-types";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {generatePath, useNavigate, useParams} from "react-router";
import DeliveryAddress from "@/components/Address/DeliveryAddress";
import LinearProgress from "@mui/material/LinearProgress";
import ReloadCustomerButton from "./ReloadCustomerButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EmailAddressEditor from "@/components/EmailAddressEditor";
import TelephoneFormFields from "./TelephoneFormFields";
import {customerSlug} from "@/utils/customer";
import PrimaryShipToButton from "./PrimaryShipToButton";
import TextField from "@mui/material/TextField";

const ShipToForm = () => {
    const dispatch = useAppDispatch();
    const shipToAddresses = useSelector(selectPermittedShipToAddresses);
    const loading = useSelector(selectCustomerLoading);
    const canEdit = useSelector(selectCanEdit);
    const billTo = useAppSelector(selectPermittedBillToAddress);
    const params = useParams<'shipToCode'>();
    const [shipTo, setShipTo] = useState<ShipToCustomer & Editable | null>(null);
    const navigate = useNavigate();

    const readOnly = !canEdit;

    useEffect(() => {
        if (!loading) {
            const [shipTo] = shipToAddresses.filter(row => row.ShipToCode === params.shipToCode);
            setShipTo(shipTo ?? null);
            if (!billTo) {
                dispatch(setShipToCode(shipTo?.ShipToCode ?? null));
            }
        }
    }, [shipToAddresses, params, loading, billTo])


    // const onNewShipToCustomer = () => {
    //     //@TODO: should we allow a B2B user to create a new shipTo location?
    // }

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!shipTo || !canEdit) {
            return;
        }
        dispatch(saveShipToAddress(shipTo));
    }

    const changeHandler = (arg: Partial<ShipToCustomer>) => {
        if (shipTo) {
            setShipTo({...shipTo, ...arg, changed: true});
        }
    }

    const fieldChangeHandler = (field: keyof ShipToCustomer) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'Reseller':
                return changeHandler({[field]: ev.target.checked ? 'Y' : 'N'})
            default:
                changeHandler({[field]: ev.target.value});
        }
    }

    const cancelHandler = () => {
        navigate(generatePath('/account/:customerSlug/delivery', {customerSlug: customerSlug(shipTo)}));
    }

    if (!canEdit) {
        return (
            <div>
                <h4>Delivery Address</h4>
                {loading && <LinearProgress variant="indeterminate"/>}
                {shipTo && <DeliveryAddress address={shipTo}/>}
            </div>
        )
    }

    return (
        <div>
            {loading && <LinearProgress variant="indeterminate"/>}
            {shipTo && (
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={{xs: 12, sm: 6}}>
                            <TextField variant="filled" label="Location Name" fullWidth size="small"
                                       type="text" value={shipTo.ShipToName ?? ''}
                                       onChange={fieldChangeHandler('ShipToName')}
                                       slotProps={{
                                           htmlInput: {readOnly}
                                       }}/>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}
                               style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <TextField variant="filled" label="Location Code" size="small"
                                       type="text" value={shipTo.ShipToCode ?? ''}
                                       onChange={fieldChangeHandler('ShipToCode')}
                                       slotProps={{
                                           htmlInput: {readOnly: true}
                                       }}/>
                            <PrimaryShipToButton shipTo={shipTo} disabled={readOnly || !billTo}/>
                        </Grid>
                    </Grid>
                    <hr/>
                    <Grid container spacing={2}>
                        <Grid size={{xs: 12, sm: 6}}>
                            <ShipToAddressFormFields address={shipTo} readOnly={readOnly} onChange={changeHandler}/>
                        </Grid>
                        <Grid size={{xs: 12, sm: 6}}>
                            <Stack direction="column" spacing={2}>
                                <StoreMapToggle checked={shipTo.Reseller === 'Y'}
                                                onChange={fieldChangeHandler('Reseller')}
                                                readOnly={readOnly}/>
                                <EmailAddressEditor label="Email Address"
                                                    readOnly={!canEdit}
                                                    value={shipTo.EmailAddress}
                                                    onChange={changeHandler}/>
                                <TelephoneFormFields account={shipTo} onChange={changeHandler} readOnly={!canEdit}/>
                                {shipTo.changed && (
                                    <Alert severity="warning" title="Hey!">Don&apos;t forget to save your
                                        changes.</Alert>
                                )}
                            </Stack>
                            <Stack direction="row" spacing={2} sx={{my: 3}} justifyContent="flex-end">
                                <Button type="button" onClick={cancelHandler}>Cancel</Button>
                                <ReloadCustomerButton/>
                                <Button type="submit" variant="contained"
                                        disabled={readOnly || loading}>
                                    Save
                                </Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </form>
            )}
        </div>
    )
}

export default ShipToForm;

