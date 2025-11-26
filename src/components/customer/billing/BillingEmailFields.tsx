import type {BillToCustomer} from "chums-types/b2b";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {type ChangeEvent, useEffect, useState} from "react";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice.ts";
import {selectCanEdit} from "@/ducks/user/userProfileSlice.ts";

export interface BillingEmailFieldsProps {
    onChange: (arg: Partial<BillToCustomer>) => void;
}

export default function BillingEmailFields({onChange}: BillingEmailFieldsProps) {
    const current = useAppSelector(selectCustomerAccount);
    const canEdit = useAppSelector(selectCanEdit);
    const [emailAddresses, setEmailAddresses] = useState<string[]>(current?.EmailAddress?.split(';')?.map(email => email.trim()) ?? [''])

    useEffect(() => {
        setEmailAddresses(current?.EmailAddress?.split(';')?.map(email => email.trim()) ?? ['']);
    }, [current]);

    const emailChangeHandler = (index: number) => (ev: ChangeEvent<HTMLInputElement>) => {
        const email: string[] = [...emailAddresses];
        if (email[index] !== undefined) {
            email[index] = ev.target.value;
        }
        setEmailAddresses(email);
        onChange({EmailAddress: email.join(';')});
    }

    const addEmailAddressHandler = (after: number) => {
        const email = emailAddresses.toSpliced(after + 1, 0, '');
        setEmailAddresses(email);
        onChange({EmailAddress: email.join(';')});
    }

    const removeEmailAddressHandler = (index: number) => {
        if (emailAddresses[index] !== undefined) {
            const email = emailAddresses.filter((_, _index) => _index !== index);
            if (email.length === 0) {
                email.push('');
            }
            setEmailAddresses(email);
            onChange({EmailAddress: email.join(';')});
        }
    }

    return (
        <div>
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
        </div>
    )
}
