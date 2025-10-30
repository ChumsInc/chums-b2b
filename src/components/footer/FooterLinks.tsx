import {useState} from "react";
import Box from "@mui/material/Box";
import AppVersion from "@/ducks/version/AppVersion";
import SignUpModal from "@/components/sign-up/SignUpModal.tsx";
import Link from "@mui/material/Link";
import {Link as NavLink} from "react-router";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import FooterLink from "@/components/footer/FooterLink";
import CookiePolicyLink from "@/components/cookie-consent/CookiePolicyLink";

const BottomLinksContainer = styled(Box)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#262626',
    color: '#EEEEEE',
    fontSize: '12px',
    textTransform: 'uppercase',
    padding: 'calc(var(--footer-contacts-padding) / 2)',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
    }
}));

const BottomLinks = styled(Stack)(({theme}) => ({
    margin: '0 7px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '* a': {
        padding: '0 calc(var(--footer-contacts-padding) / 3)',
        color: '#EEEEEE !important',
        whiteSpace: 'nowrap',
        '&:hover': {
            color: theme.palette.primary.light,
        }
    }
}));


export default function FooterLinks() {
    const [year] = useState(new Date().getFullYear());


    return (
        <BottomLinksContainer>
            <Box sx={{ml: {xs: '1rem'}}}><AppVersion/></Box>
            <Box sx={{ml: {xs: '1rem'}}}><SignUpModal/></Box>
            <BottomLinks direction="row" useFlexGap flexWrap="wrap">
                <FooterLink underline="hover" href="//intranet.chums.com/apps/current-openings"
                            target="_blank" rel="noreferrer">
                    CAREERS
                </FooterLink>
                <FooterLink underline="hover" href="//chums.com/page/customization"
                            target="_blank" rel="noreferrer">
                    CUSTOMIZE
                </FooterLink>
                <FooterLink underline="hover" href="//chums.com/page/contact-us" target="_blank"
                            rel="noreferrer">CONTACT</FooterLink>
                <CookiePolicyLink/>
                <Link component={NavLink} to="/pages/privacy-policy"
                      sx={{color: 'primary.contrastText'}}>Privacy Policy</Link>
                <FooterLink underline="hover" href="https://chums.com" target="_blank"
                            rel="noreferrer">CHUMS.COM</FooterLink>
            </BottomLinks>
            <Box sx={{mr: 1}}>
                © {year} Chums. All rights reserved
            </Box>
        </BottomLinksContainer>
    )
}
