import React, {useEffect} from 'react';
import AccountButtons from "./AccountButtons";
import UserProfile from "./UserProfile";
import {documentTitles} from '@constants/paths';
import DocumentTitle from "../../../components/DocumentTitle";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {
    selectAccessListLoading,
    selectCurrentAccess,
    selectCustomerAccessList,
    selectRepAccessList
} from "../selectors";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import {useLocation} from "react-router";
import {setReturnToPath} from "../../customer/actions";
import StoredSettings from "@ducks/user/components/StoredSettings";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAccessListLoading);
    const customerAccounts = useAppSelector(selectCustomerAccessList);
    const repAccounts = useAppSelector(selectRepAccessList);
    const currentAccess = useAppSelector(selectCurrentAccess);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.returnTo) {
            dispatch(setReturnToPath(location.state.returnTo));
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <DocumentTitle documentTitle={documentTitles.profile}/>
            <UserProfile/>
            {loading && <LinearProgress variant="indeterminate"/>}
            {!!customerAccounts.length && (
                <Box sx={{mt: 3}}>
                    <Typography variant="h2" component="h2">Customer Accounts</Typography>
                    <AccountButtons userAccounts={customerAccounts} userAccount={currentAccess}/>
                </Box>
            )}

            {!!repAccounts.length && (
                <Box sx={{mt: 3}}>
                    <Typography variant="h2" component="h2">Rep Accounts</Typography>
                    <AccountButtons userAccounts={repAccounts} userAccount={currentAccess}/>
                </Box>
            )}

            <StoredSettings sx={{mt: 5}} />
        </Container>
    );
}

export default ProfilePage;
