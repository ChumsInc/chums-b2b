import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import CustomerSignUp from "./CustomerSignUp";
import {documentTitles, PATH_SET_PASSWORD} from "@/constants/paths";
import MAPPolicy from "../../components/MAPPolicy";
import UsagePolicy from "../../components/UsagePolicy";
import DocumentTitle from "../../components/DocumentTitle";
import {selectLoggedIn} from "../user/selectors";
import {useNavigate} from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {useIsSSR} from "@/hooks/is-server-side";

const SignUp = () => {
    const isSSR = useIsSSR();
    const navigate = useNavigate();
    const loggedIn = useSelector(selectLoggedIn);


    useEffect(() => {
        if (loggedIn) {
            navigate('/profile', {replace: true});
        }
    }, [loggedIn]);

    useEffect(() => {
        if (isSSR) {
            return;
        }
        const params = new URLSearchParams(document?.location?.search);
        const hash = params.get('h') ?? '';
        const key = params.get('key') ?? '';
        if (!loggedIn && !!hash && !!key) {
            navigate(PATH_SET_PASSWORD + document?.location?.search, {replace: true});
        }
    }, [isSSR])

    return (
        <div>
            <DocumentTitle documentTitle={documentTitles.signUp}/>
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
