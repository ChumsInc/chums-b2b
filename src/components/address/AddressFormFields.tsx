import type {ChangeEvent} from 'react';
import StateSelect from '../StateSelect';
import CountrySelect from '../CountrySelect';
import type {CustomerAddress} from "chums-types/b2b";
import {isCanada, isUSA} from "@/utils/customer";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

export interface AddressFormFieldsProps {
    address: CustomerAddress;
    onChange: (arg: Partial<CustomerAddress>) => void;
    readOnly?: boolean;
    addressType?: 'billing' | 'shipping';
}

export default function AddressFormFields({address, onChange, readOnly, addressType}: AddressFormFieldsProps) {
    const requiresStateCode = isUSA(address.CountryCode ?? '') || isCanada(address.CountryCode ?? '');

    const changeHandler = (field: keyof CustomerAddress) => (ev: ChangeEvent<HTMLInputElement>) => {
        switch (field) {
            case 'AddressLine1':
            case 'AddressLine2':
            case 'AddressLine3':
            case 'City':
            case 'State':
            case 'ZipCode':
                onChange({[field]: ev.target.value})
                return
            // no default
        }
    }

    const valueChangeHandler = (field: keyof CustomerAddress) => (value: string) => {
        switch (field) {
            case 'State':
            case 'CountryCode':
                onChange({[field]: value});
                return;
            // no default
        }
    }

    return (
        <Stack direction="column" spacing={1}>

            <TextField variant="filled" fullWidth label="Address 1" size="small"
                       onChange={changeHandler('AddressLine1')} value={address.AddressLine1 ?? ''}
                       slotProps={{
                           htmlInput: {
                               readOnly,
                               maxLength: 30,
                               autoComplete: `${addressType ?? 'billing'} address-line1`
                           }
                       }}
                       required/>
            <TextField variant="filled" fullWidth label="Address 2" size="small"
                       onChange={changeHandler('AddressLine2')} value={address.AddressLine2 ?? ''}
                       slotProps={{
                           htmlInput: {
                               readOnly,
                               maxLength: 30,
                               autoComplete: `${addressType ?? 'billing'} address-line2`
                           }
                       }}
            />
            <TextField variant="filled" onChange={changeHandler('AddressLine3')} value={address.AddressLine3 ?? ''}
                       slotProps={{
                           htmlInput: {
                               readOnly,
                               maxLength: 30,
                               autoComplete: `${addressType ?? 'billing'} address-line3`
                           }
                       }}
                       size="small"
                       fullWidth label="Address 3"/>
            <TextField variant="filled" fullWidth size="small" label="City"
                       onChange={changeHandler('City')} value={address.City ?? ''}
                       slotProps={{
                           htmlInput: {
                               readOnly,
                               maxLength: 30,
                               autoComplete: `${addressType ?? 'billing'} address-level2`
                           }
                       }}
                       required/>
            <Stack direction={{xs: 'column', md: 'row'}} spacing={1}>
                {requiresStateCode && (
                    <StateSelect value={address.State ?? ''} countryCode={address.CountryCode}
                                 required
                                 slotProps={{
                                     htmlInput: {
                                         readOnly,
                                         disabled: readOnly,
                                         autoComplete: `${addressType ?? 'billing'} address-level1`
                                     }
                                 }}
                                 variant="filled" size="small"
                                 onChange={valueChangeHandler('State')}/>
                )}
                {!requiresStateCode && (
                    <TextField variant="filled" onChange={changeHandler('State')} value={address.State ?? ''}
                               slotProps={{
                                   htmlInput: {
                                       readOnly,
                                       maxLength: 30,
                                       autoComplete: `${addressType ?? 'billing'} address-level1`
                                   }
                               }}
                               size="small"
                               required fullWidth label="State"/>
                )}
                <TextField variant="filled" fullWidth label="Postal Code" size="small"
                           onChange={changeHandler('ZipCode')} value={address.ZipCode ?? ''}
                           slotProps={{
                               htmlInput: {
                                   readOnly,
                                   maxLength: 10,
                                   autoComplete: `${addressType ?? 'billing'} postal-code`
                               }
                           }}
                           required/>
                <CountrySelect value={address.CountryCode ?? ''} onChange={valueChangeHandler('CountryCode')}
                               variant="filled" size="small"
                               slotProps={{
                                   htmlInput: {
                                       autoComplete: `${addressType ?? 'billing'} country-code`,
                                       readOnly,
                                       disabled: readOnly
                                   }
                               }}
                               required/>

            </Stack>
        </Stack>
    )
}
