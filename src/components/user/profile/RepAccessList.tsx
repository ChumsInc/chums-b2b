import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {sortUserAccounts} from "@/utils/customer";
import Stack from "@mui/material/Stack";
import RepAccessButton from "@/components/user/profile/RepAccessButton";
import {useProfile} from "@/hooks/profile-provider/use-profile-hook.ts";

export default function RepAccessList() {
    const {list, currentAccess} = useProfile();

    const repAccounts = list
        .filter(acct => acct.isRepAccount)
        .sort(sortUserAccounts);

    if (repAccounts.length === 0) {
        return null;
    }

    return (
        <Box sx={{mt: 3}}>
            <Typography variant="h2" component="h2">Rep Accounts</Typography>
            <Stack spacing={2} direction="row" useFlexGap flexWrap="wrap">
                {repAccounts
                    .map(acct => (
                        <RepAccessButton key={acct.id} access={acct} active={acct.id === currentAccess?.id}/>
                    ))}
            </Stack>
        </Box>
    )
}
