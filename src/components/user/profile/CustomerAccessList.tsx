import {useAppSelector} from "@/app/configureStore.ts";
import {selectCurrentAccess, selectCustomerAccessList} from "@/ducks/user/userAccessSlice.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import {sortUserAccounts} from "@/utils/customer.ts";
import Stack from "@mui/material/Stack";
import CustomerAccessButton from "@/components/user/profile/CustomerAccessButton.tsx";

export default function CustomerAccessList() {
    const list = useAppSelector(selectCustomerAccessList);
    const current = useAppSelector(selectCurrentAccess);

    if (list.length === 0) return null;

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="h2" component="h2">Customer Accounts</Typography>
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                {list
                    .sort(sortUserAccounts)
                    .map(acct => (
                        <CustomerAccessButton key={acct.id} access={acct} active={acct.id === current?.id}/>
                    ))}
            </Stack>
        </Box>
    )
}
