import {useEffect} from 'react';
import {longAccountNumber} from "@/utils/customer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {useAppSelector} from "@/app/hooks";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import {documentTitles, PATH_PROFILE} from "@/constants/paths";
import Breadcrumb from "../common/Breadcrumb.tsx";
import {useLocation, useNavigate} from "react-router";
import {selectCustomersStatus} from "@/ducks/customers/customerListSlice";
import Typography from "@mui/material/Typography";
import AccountListFilters from "./AccountListFilters";
import AccountListTable from "./AccountListTable";
import {repAccessCode} from "@/ducks/user/utils";
import {useTitle} from "@/components/app/TitleContext";
import {useProfile} from "@/hooks/profile-provider/use-profile-hook.ts";

const AccountList = () => {
    const location = useLocation();
    const {currentAccess} = useProfile();
    const loading = useAppSelector(selectCustomersStatus);
    const {setPageTitle} = useTitle();
    const navigate = useNavigate();

    const documentTitle = documentTitles.accountList.replace(':name', currentAccess?.SalespersonName ?? '');

    useEffect(() => {
        setPageTitle({title: documentTitle, description: 'Account List'});
    }, [documentTitle, setPageTitle]);


    if (!currentAccess) {
        return (
            <div>
                <Alert severity="info">Please select a valid profile.</Alert>
            </div>
        )
    }

    if (!currentAccess.isRepAccount) {
        navigate(PATH_PROFILE);
        return null;
    }

    const paths = [
        {title: 'Profile', pathname: PATH_PROFILE},
        {title: repAccessCode(currentAccess), pathname: PATH_PROFILE},
        {title: 'Account List', pathname: location.pathname}
    ];

    return (
        <ErrorBoundary>
            <Breadcrumb paths={paths}/>
            <Typography variant="h1" component="h1">Account List</Typography>
            <Typography variant="h2" component="h2">
                {currentAccess?.SalespersonName ?? ''} <small
                className="ms-3">({longAccountNumber(currentAccess)})</small>
            </Typography>

            <AccountListFilters/>
            {loading === 'loading' && <LinearProgress variant="indeterminate" sx={{my: 1}}/>}

            <AccountListTable/>
        </ErrorBoundary>
    );
}

export default AccountList;
