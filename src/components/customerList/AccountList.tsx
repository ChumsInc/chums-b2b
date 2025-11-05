'use client';

import {useEffect} from 'react';
import {loadCustomerList} from '@/ducks/customers/actions';
import {longAccountNumber} from "@/utils/customer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import {documentTitles, PATH_PROFILE} from "@/constants/paths";
import DocumentTitle from "../DocumentTitle";
import Breadcrumb from "../Breadcrumb";
import {useLocation, useMatch} from "react-router";
import {selectCustomersStatus} from "@/ducks/customers/customerListSlice";
import Typography from "@mui/material/Typography";
import AccountListFilters from "./AccountListFilters";
import AccountListTable from "./AccountListTable";
import {repAccessCode} from "@/ducks/user/utils";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";

const AccountList = () => {
    const dispatch = useAppDispatch();
    const match = useMatch('/profile/:id');
    const location = useLocation();
    const userAccount = useAppSelector(selectCurrentAccess);
    const loading = useAppSelector(selectCustomersStatus);


    useEffect(() => {
        const profileId = +(match?.params.id ?? 0);
        if (loading === 'idle' && profileId === userAccount?.id) {
            dispatch(loadCustomerList(userAccount));
        }
    }, [loading, match, userAccount, dispatch]);


    if (!userAccount) {
        return (
            <div>
                <Alert severity="info">Please select a valid profile.</Alert>
            </div>
        )
    }

    const documentTitle = documentTitles.accountList.replace(':name', userAccount.SalespersonName || '');

    const paths = [
        {title: 'Profile', pathname: PATH_PROFILE},
        {title: repAccessCode(userAccount), pathname: PATH_PROFILE},
        {title: 'Account List', pathname: location.pathname}
    ];

    return (
        <ErrorBoundary>
            <DocumentTitle documentTitle={documentTitle}/>
            <Breadcrumb paths={paths}/>
            <Typography variant="h1" component="h1">Account List</Typography>
            <Typography variant="h2" component="h2">
                {userAccount?.SalespersonName ?? ''} <small className="ms-3">({longAccountNumber(userAccount)})</small>
            </Typography>

            <AccountListFilters/>
            {loading === 'loading' && <LinearProgress variant="indeterminate" sx={{my: 1}}/>}

            <AccountListTable/>
        </ErrorBoundary>
    );
}

export default AccountList;
