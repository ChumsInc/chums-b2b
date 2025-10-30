import React, {useEffect} from 'react';
import UserProfile from "./UserProfile.tsx";
import {documentTitles} from '@/constants/paths.ts';
import DocumentTitle from "../../DocumentTitle.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import {useLocation} from "react-router";
import {setReturnToPath} from "@/ducks/customer/actions.ts";
import StoredSettings from "@/components/user/profile/StoredSettings.tsx";
import {selectAccessStatus} from "@/ducks/user/userAccessSlice.ts";
import CustomerAccessList from "@/components/user/profile/CustomerAccessList.tsx";
import RepAccessList from "@/components/user/profile/RepAccessList.tsx";

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const accessStatus = useAppSelector(selectAccessStatus);
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
            {accessStatus === 'loading' && <LinearProgress variant="indeterminate"/>}
            <CustomerAccessList/>
            <RepAccessList/>
            <StoredSettings sx={{mt: 5}}/>
        </Container>
    );
}

export default ProfilePage;
