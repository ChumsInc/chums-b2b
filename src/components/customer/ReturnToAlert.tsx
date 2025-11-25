

import {selectCustomerReturnToPath} from "@/ducks/customer/currentCustomerSlice";
import Alert from "@mui/material/Alert";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {setReturnToPath} from "@/ducks/customer/actions";
import {Link as NavLink} from 'react-router'
import Link from "@mui/material/Link";


const returnPathText = (path: string): string => {
    if (path.startsWith('/products')) {
        return 'Continue Shopping';
    }
    return `Return to ${path}`;
}

const ReturnToAlert = () => {
    const dispatch = useAppDispatch();
    const returnToPath = useAppSelector(selectCustomerReturnToPath);

    if (!returnToPath) {
        return null;
    }

    const onCancel = () => {
        dispatch(setReturnToPath(null));
    }

    return (
        <Alert severity="info" onClose={onCancel}>
            <Link component={NavLink} to={returnToPath}>{returnPathText(returnToPath)}</Link>
        </Alert>
    )
}

export default ReturnToAlert;
