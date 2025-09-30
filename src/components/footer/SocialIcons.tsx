import React from 'react';
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import FooterLink from "@/components/footer/FooterLink";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from "@mui/material/Box";
import {visuallyHidden} from '@mui/utils'

const SocialIconStack = styled(Stack)`
    padding: var(--footer-contacts-padding);
`

export default function SocialIcons() {
    return (
        <SocialIconStack sx={{mr: 1}} direction="row" spacing={1}>
                    <FooterLink href="https://www.linkedin.com/company/chums-inc-" target="_blank" rel="noreferrer">
                        <LinkedInIcon/>
                        <Box component="span" sx={visuallyHidden}>Follow Chums on LinkedIn</Box>
                    </FooterLink>
                    <FooterLink href="https://www.facebook.com/Chumsusa" target="_blank" rel="noreferrer">
                        <FacebookIcon/>
                        <Box sx={visuallyHidden}>Like Chums on Facebook</Box>
                    </FooterLink>
                    <FooterLink href="https://instagram.com/chumsusa" target="_blank" rel="noreferrer">
                        <InstagramIcon/>
                        <Box sx={visuallyHidden}>Like Chums on Instagram</Box>
                    </FooterLink>
                </SocialIconStack>
    )
}
