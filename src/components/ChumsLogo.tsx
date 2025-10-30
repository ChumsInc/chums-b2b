import Box from "@mui/material/Box";
import {type SxProps} from "@mui/system";
import styled from "@emotion/styled";

const LogoImg = styled.img`
    width: 100%;
    height: auto;
`;

export default function ChumsLogo({sx}:{
    sx?: SxProps
}) {
    return (
        <Box sx={{maxWidth: {xs: '33vw', sm: '15vw'}, width: '150px', margin: {xs: '1rem', sm: '0', md: '0 1.5rem'}, ...sx}}>
            <LogoImg src="/images/logos/Chums-Logo-Badge-Red-RGB.png" alt="Chums" width="1920" height="1080" loading="eager" />
        </Box>
    )
}
