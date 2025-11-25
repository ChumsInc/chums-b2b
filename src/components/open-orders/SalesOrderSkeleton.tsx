import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton';

export default function SalesOrderSkeleton() {
    return (
        <Grid container spacing={2}>
            <Grid size={{xs: 12, sm: 6}}>
                <Stack direction="column" spacing={2}>
                    <Skeleton variant="rectangular" height={30}/>
                    <Skeleton variant="rectangular" height={30}/>
                    <Skeleton variant="rectangular" height={30}/>
                </Stack>
            </Grid>
            <Grid size={{xs: 12, sm: 6}}>
                <Stack direction="column" spacing={2}>
                    <Skeleton variant="rectangular" height={30}/>
                    <Skeleton variant="rectangular" height={60}/>
                    <Skeleton variant="rectangular" height={30}/>
                </Stack>
            </Grid>
        </Grid>
    )
}
