import {type ChangeEvent} from 'react';
import Alert from "@mui/material/Alert";
import ShipToAddressFormFields from "./ShipToAddressFormFields";
import StoreMapToggle from "@/components/customer/common/StoreMapToggle";
import type {ShipToCustomer} from "chums-types/b2b";
import {useAppSelector} from "@/app/hooks";
import ReloadCustomerButton from "../common/ReloadCustomerButton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import EmailAddressEditor from "@/components/customer/delivery/EmailAddressEditor.tsx";
import TelephoneFormFields from "../common/TelephoneFormFields";
import PrimaryShipToButton from "./PrimaryShipToButton";
import TextField from "@mui/material/TextField";
import {selectCustomerLoadStatus} from "@/ducks/customer/currentCustomerSlice";
import {useEditorContext} from "@/hooks/editor/useEditorContext.ts";

export interface ShipToFormProps {
    readOnly?: boolean;
    onSave: (arg: ShipToCustomer) => void;
}

export default function ShipToForm({readOnly, onSave}: ShipToFormProps) {
    const {value, updateValue, changed, reset} = useEditorContext<ShipToCustomer>();
    const status = useAppSelector(selectCustomerLoadStatus);


    const changeHandler = (arg: Partial<ShipToCustomer>) => {
        updateValue(arg);
    }

    const fieldChangeHandler = (field: keyof ShipToCustomer) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'Reseller':
                updateValue({[field]: ev.target.checked ? 'Y' : 'N'})
                return
            default:
                updateValue({[field]: ev.target.value});
        }
    }

    const submitHandler = () => {
        onSave(value);
    }

    return (
        <form action={submitHandler}>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{xs: 12, sm: 6}}>
                    <TextField variant="filled" label="Location Name" fullWidth size="small"
                               type="text" value={value.ShipToName ?? ''}
                               onChange={fieldChangeHandler('ShipToName')}
                               slotProps={{
                                   htmlInput: {readOnly}
                               }}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}
                      style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <TextField variant="filled" label="Location Code" size="small"
                               type="text" value={value.ShipToCode ?? ''}
                               onChange={fieldChangeHandler('ShipToCode')}
                               slotProps={{
                                   htmlInput: {readOnly: true}
                               }}/>
                    <PrimaryShipToButton shipTo={value} disabled={readOnly || changed}/>
                </Grid>
            </Grid>
            <hr/>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <ShipToAddressFormFields address={value} readOnly={readOnly} onChange={changeHandler}/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack direction="column" spacing={2}>
                        <StoreMapToggle checked={value.Reseller === 'Y'}
                                        onChange={fieldChangeHandler('Reseller')}
                                        readOnly={readOnly}/>
                        <EmailAddressEditor label="Email Address"
                                            readOnly={readOnly}
                                            value={value.EmailAddress}
                                            onChange={changeHandler}/>
                        <TelephoneFormFields account={value} onChange={changeHandler} readOnly={readOnly}/>
                        {changed && (
                            <Alert severity="warning" title="Hey!">Don&apos;t forget to save your
                                changes.</Alert>
                        )}
                    </Stack>
                    <Stack direction="row" spacing={2} sx={{my: 3}} justifyContent="flex-end">
                        <Button type="button" onClick={reset}>Cancel</Button>
                        <ReloadCustomerButton/>
                        <Button type="submit" variant="contained"
                                disabled={readOnly || status !== 'idle'}>
                            Save
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    )
}
