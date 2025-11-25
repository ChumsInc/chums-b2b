import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "@/app/hooks";
import {selectSalesOrderStatus} from "@/ducks/open-orders/currentOrderSlice";

export default function SalesOrderLoadingProgress() {
    const loading = useAppSelector(selectSalesOrderStatus);
    if (loading === 'idle' || loading === 'rejected') {
        return null;
    }
    return (
        <LinearProgress variant="indeterminate" sx={{my: 1}}/>
    )
}
