import {useId} from 'react';
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl, {type FormControlProps} from '@mui/material/FormControl'
import Select, {type SelectChangeEvent} from "@mui/material/Select";
import type {ShipToAddress} from "chums-types/b2b";
import {shipToAddressFromBillingAddress} from "@/utils/customer";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useAppSelector} from "@/app/hooks";
import {selectPermittedShipToAddresses} from "@/ducks/customer/customerShipToAddressSlice";
import {selectCustomerPermissions} from "@/ducks/customer/customerPermissionsSlice";
import {selectPermittedBillToAddress} from "@/ducks/customer/selectors";

export interface ShipToSelectProps extends Omit<FormControlProps, 'value' | 'onChange'> {
    value: string | null;
    defaultName?: string;
    label?: string;
    disabledShipToLocations?: string[];
    allowAllLocations?: boolean;
    onChange: (shipToCode: string | null, address: ShipToAddress | null) => void;
    readOnly?: boolean;
    required?: boolean;
}

export const allLocationsValue = '__ALL';

export default function ShipToSelect({
                                         value,
                                         defaultName,
                                         label,
                                         disabledShipToLocations,
                                         allowAllLocations,
                                         onChange,
                                         readOnly,
                                         required,
                                         ...formControlProps
                                     }: ShipToSelectProps) {
    const customer = useAppSelector(selectCustomerAccount);
    const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
    const hasBillToPermissions = useAppSelector(selectPermittedBillToAddress);
    const permissions = useAppSelector(selectCustomerPermissions);
    const id = useId();


    const changeHandler = (ev: SelectChangeEvent) => {
        if (!customer) {
            onChange(ev.target.value, null);
            return
        }
        const _value = ev.target.value ?? customer?.PrimaryShipToCode ?? '';
        if (allowAllLocations && _value === allLocationsValue) {
            onChange(null, null);
            return
        }

        const [address] = shipToAddresses.filter(st => st.ShipToCode === _value);

        if (!address && permissions?.billTo) {
            onChange(_value, shipToAddressFromBillingAddress(customer));
            return;
        }

        const {
            ShipToName,
            ShipToAddress1,
            ShipToAddress2,
            ShipToAddress3,
            ShipToCity,
            ShipToState,
            ShipToCountryCode,
            ShipToZipCode
        } = address;
        onChange(_value, {
            ShipToName,
            ShipToAddress1,
            ShipToAddress2,
            ShipToAddress3,
            ShipToCity,
            ShipToState,
            ShipToCountryCode,
            ShipToZipCode
        });
    }

    if (!shipToAddresses.length) {
        return null;
    }

    const renderValueHandler = (val: string) => {
        if (val === '' && permissions?.billTo) {
            return 'Billing address';
        }
        if (val === allLocationsValue) {
            return 'All Locations';
        }
        const [shipTo] = shipToAddresses.filter(st => st.ShipToCode === val);
        if (shipTo) {
            return `[${shipTo?.ShipToCode}]  ${shipTo?.ShipToName}, ${shipTo?.ShipToCity} ${shipTo?.ShipToState}`;
        }
        return '';
    }

    const isValidValue = value === ''
        || (allowAllLocations && value === allLocationsValue)
        || !!shipToAddresses.filter(st => st.ShipToCode === value).length;


    return (
        <FormControl fullWidth variant="filled" size="small" {...formControlProps}>
            <InputLabel id={id} shrink>{label ?? 'Ship-To Location'}</InputLabel>
            <Select onChange={changeHandler} variant={formControlProps.variant ?? 'filled'} id={id}
                    value={isValidValue ? (value ?? (allowAllLocations ? allLocationsValue : '')) : ''}
                    displayEmpty
                    renderValue={renderValueHandler}
                    readOnly={readOnly} required={required}>
                {allowAllLocations && (<MenuItem value={allLocationsValue}>All Addresses</MenuItem>)}
                {hasBillToPermissions && <MenuItem value="">Billing Address</MenuItem>}
                {shipToAddresses
                    .filter(shipTo => shipTo.ShipToCode !== '' || permissions?.billTo)
                    .map(shipTo => (
                        <MenuItem key={shipTo.ShipToCode} value={shipTo.ShipToCode}
                                  disabled={disabledShipToLocations?.includes(shipTo.ShipToCode)}>
                            <Stack direction="row" key={shipTo.ShipToCode} spacing={2} sx={{width: '100%'}}>
                                <Chip label={shipTo.ShipToCode} size="small" sx={{flex: '0 0 20%'}}/>
                                <Box sx={{width: '80%'}}>
                                    <Typography variant="body1"
                                                sx={{whiteSpace: 'wrap'}}>{shipTo.ShipToName}</Typography>
                                    <Typography variant="body1"
                                                sx={{fontSize: '80%'}}>{shipTo.ShipToCity}, {shipTo.ShipToState}</Typography>
                                </Box>
                            </Stack>
                        </MenuItem>
                    ))}
            </Select>
        </FormControl>
    )
}

