import Alert from "@mui/material/Alert";
import {selectOpenOrdersLength} from "@/ducks/open-orders/openOrdersSlice";
import {useAppSelector} from "@/app/hooks";

export default function NoOpenOrdersAlert() {
    const length = useAppSelector(selectOpenOrdersLength);
    if (length > 0) {
        return null;
    }
    return (
        <Alert severity="info">There are currently no open orders.</Alert>
    )
}
