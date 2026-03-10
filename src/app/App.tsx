import {StrictMode, useEffect} from 'react';
import {GoogleOAuthProvider} from "@react-oauth/google";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import theme from "./theme";
import {GOOGLE_CLIENT_ID} from "@/constants/app";
import LocalStore from "../utils/LocalStore";
import {isTokenExpired} from "@/utils/jwtHelper";
import {auth} from "@/api/IntranetAuthService";
import {selectAppNonce} from "@/ducks/app/selectors";
import AppRouter from "@/app/AppRouter.tsx";
import TitleProvider from "@/components/app/TitleProvider";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import {loadProfile} from "@/ducks/user/actions.ts";


export default function App() {
    const dispatch = useAppDispatch();
    const nonce = useAppSelector(selectAppNonce);
    const loggedIn = useAppSelector(selectLoggedIn);


    useEffect(() => {
        LocalStore.removeDeprecatedItems();
        const token = auth.getToken();
        if (token && isTokenExpired(token)) {
            auth.removeToken();
        }
        if (loggedIn) {
            dispatch(loadProfile());
        }
    }, [dispatch, loggedIn]);


    return (
        <StrictMode>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} nonce={nonce ?? undefined}>
                            <TitleProvider>
                                <AppRouter/>
                            </TitleProvider>
                        </GoogleOAuthProvider>
                    </CssBaseline>
                </ThemeProvider>
            </LocalizationProvider>
        </StrictMode>
    )
}
