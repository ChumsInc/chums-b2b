import React, {useEffect} from 'react';
import CustomerSignUp from "./CustomerSignUp.tsx";
import {documentTitles, PATH_SET_PASSWORD} from "@/constants/paths.ts";
import MAPPolicy from "../MAPPolicy.tsx";
import UsagePolicy from "../UsagePolicy.tsx";
import DocumentTitle from "../DocumentTitle.tsx";
import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import {useNavigate} from "react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {useIsSSR} from "@/hooks/is-server-side.ts";
import {useAppSelector} from "@/app/configureStore.ts";

const SignUp = () => {
    const isSSR = useIsSSR();
    const navigate = useNavigate();
    const loggedIn = useAppSelector(selectLoggedIn);


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
