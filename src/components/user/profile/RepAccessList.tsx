import {useAppSelector} from "@/app/configureStore";
import {selectCurrentAccess, selectRepAccessList} from "@/ducks/user/userAccessSlice";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import {sortUserAccounts} from "@/utils/customer";
import Stack from "@mui/material/Stack";
import RepAccessButton from "@/components/user/profile/RepAccessButton";

export default function RepAccessList() {
    const list = useAppSelector(selectRepAccessList);
    const current = useAppSelector(selectCurrentAccess);

    if (list.length === 0) return null;

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="h2" component="h2">Rep Accounts</Typography>
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                {list
                    .sort(sortUserAccounts)
                    .map(acct => (
                        <RepAccessButton key={acct.id} access={acct} active={acct.id === current?.id}/>
                    ))}
            </Stack>
        </Box>
    )
}
