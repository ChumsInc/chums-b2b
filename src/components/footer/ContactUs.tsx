import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";


const AddressBox = styled(Box)(({theme}) => ({
    padding: 'var(--footer-contacts-padding)',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
        textAlign: 'left'
    }
}))

export default function ContactUs() {
    return (
        <AddressBox>
            <div><strong>CONTACT US</strong></div>
            <div>
                <Typography component="address" variant="body1">
                    <div>2424 SOUTH 2570 WEST</div>
                    <div>SALT LAKE CITY, UT 84119</div>
                    <div>(800) 222-2486</div>
                </Typography>
            </div>
        </AddressBox>
    )
}
