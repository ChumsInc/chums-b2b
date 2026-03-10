import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export default function BillToSkeleton() {
    return (
        <div>
            <Typography variant="h1">
                <Skeleton variant="text"/>
            </Typography>
            <LinearProgress variant="indeterminate"/>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <Skeleton variant="rectangular" height={23} width="100%"/>
                </Grid>
            </Grid>
        </div>
    )
}
