import React from 'react';
import Box from "@mui/material/Box";

export default function ChumsLogo() {
    return (
        <Box component="img"
             sx={{maxWidth: {xs: '33vw', sm: '15vw'}, width: '150px', margin: {xs: '1rem', sm: '0', md: '0 1.5rem'}}}
             src={"/images/logos/40YearBadgeLogo_RGB_091322.png"} alt="Chums Logo"/>
    )
}
