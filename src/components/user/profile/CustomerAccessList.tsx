import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {sortUserAccounts} from "@/utils/customer";
import Stack from "@mui/material/Stack";
import CustomerAccessButton from "@/components/user/profile/CustomerAccessButton";
import {useProfile} from "@/hooks/profile-provider/use-profile-hook.ts";

export default function CustomerAccessList() {
    const {list, currentAccess} = useProfile();
    const customerAccounts = list.filter(acct => !acct.isRepAccount).sort(sortUserAccounts);

    if (customerAccounts.length === 0) {
        return null;
    }

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="h2" component="h2">Customer Accounts</Typography>
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                {customerAccounts.map(acct => (
                    <CustomerAccessButton key={acct.id} access={acct} active={acct.id === currentAccess?.id}/>
                ))}
            </Stack>
        </Box>
    )
}
