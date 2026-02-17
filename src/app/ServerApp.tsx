import {StrictMode} from 'react';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {useSelector} from "react-redux";
import theme from "./theme";
import {GOOGLE_CLIENT_ID} from "@/constants/app";
import {selectAppNonce} from "@/ducks/app/selectors";
import AppRouter from "@/app/AppRouter.tsx";


export default function ServerApp() {
    const nonce = useSelector(selectAppNonce);

    return (
        <StrictMode>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                    <CssBaseline>
                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} nonce={nonce ?? undefined}>
                            <AppRouter/>
                        </GoogleOAuthProvider>
                    </CssBaseline>
                </ThemeProvider>
            </LocalizationProvider>
        </StrictMode>
    )
}
