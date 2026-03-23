import UserProfile from "./UserProfile";
import {documentTitles} from '@/constants/paths';
import {useAppSelector} from "@/app/hooks";
import LinearProgress from "@mui/material/LinearProgress";
import Container from "@mui/material/Container";
import {selectAccessStatus} from "@/ducks/user/userAccessSlice";
import CustomerAccessList from "@/components/user/profile/CustomerAccessList";
import RepAccessList from "@/components/user/profile/RepAccessList";
import {useTitle} from "@/components/app/TitleContext";
import {useEffect} from "react";

export default function ProfilePage() {
    const accessStatus = useAppSelector(selectAccessStatus);
    const {setPageTitle} = useTitle();
    useEffect(() => {
        setPageTitle({title: documentTitles.profile, description: 'View and manage your profile settings.'})
    }, []);

    return (
        <Container maxWidth="lg">
            <UserProfile/>
            {accessStatus === 'loading' && <LinearProgress variant="indeterminate"/>}
            <CustomerAccessList/>
            <RepAccessList/>
        </Container>
    );
}
