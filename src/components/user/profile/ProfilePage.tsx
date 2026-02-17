import {useEffect} from 'react';
import UserProfile from "./UserProfile";
import {documentTitles} from '@/constants/paths';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import {useLocation} from "react-router";
import {setReturnToPath} from "@/ducks/customer/actions";
import StoredSettings from "@/components/user/profile/StoredSettings";
import {selectAccessStatus} from "@/ducks/user/userAccessSlice";
import CustomerAccessList from "@/components/user/profile/CustomerAccessList";
import RepAccessList from "@/components/user/profile/RepAccessList";
import {useTitle} from "@/components/app/TitleContext";

const ProfilePage = () => {
    const dispatch = useAppDispatch();
    const accessStatus = useAppSelector(selectAccessStatus);
    const location = useLocation();
    const {setPageTitle} = useTitle()

    useEffect(() => {
        setPageTitle({title: documentTitles.profile, description: 'View and manage your profile settings.'})
        if (location.state?.returnTo) {
            dispatch(setReturnToPath(location.state.returnTo));
        }
    }, []);

    return (
        <Container maxWidth="lg">
            <UserProfile/>
            {accessStatus === 'loading' && <LinearProgress variant="indeterminate"/>}
            <CustomerAccessList/>
            <RepAccessList/>
            <StoredSettings sx={{mt: 5}}/>
        </Container>
    );
}

export default ProfilePage;
