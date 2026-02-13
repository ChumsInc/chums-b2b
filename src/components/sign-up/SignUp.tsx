import {useEffect} from 'react';
import CustomerSignUp from "./CustomerSignUp";
import {documentTitles, PATH_SET_PASSWORD} from "@/constants/paths";
import MAPPolicy from "../pages/signup/MAPPolicy.tsx";
import UsagePolicy from "../pages/signup/UsagePolicy.tsx";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import {useNavigate} from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {useAppSelector} from "@/app/hooks";
import {useTitle} from "@/components/app/TitleContext";
import useAuthKey from "@/hooks/useAuthKey.ts";

const SignUp = () => {
    const navigate = useNavigate();
    const {hash, key} = useAuthKey();
    const loggedIn = useAppSelector(selectLoggedIn);
    const {setPageTitle} = useTitle();

    useEffect(() => {
        setPageTitle({title: documentTitles.signUp, description: 'Chums Business-to-Business Website'})
    }, []);

    useEffect(() => {
        if (!loggedIn && !!hash && !!key) {
            navigate(PATH_SET_PASSWORD + document?.location?.search, {replace: true});
        }
    }, [hash, key])

    useEffect(() => {
        if (loggedIn) {
            navigate('/profile', {replace: true});
        }
    }, [loggedIn]);

    return (
        <div>
            <Typography variant="h1" component="h1" sx={{my: 3}}>Chums B2B Portal</Typography>
            <Typography component="h2" variant="h2" gutterBottom>Sign Up</Typography>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, sm: 6}}>
                    <Stack direction="column" spacing={2}>
                        <UsagePolicy/>
                        <MAPPolicy/>
                    </Stack>
                </Grid>
                <Grid size={{xs: 12, sm: 6}}>
                    <CustomerSignUp/>
                </Grid>
            </Grid>
        </div>
    );
}
export default SignUp;
