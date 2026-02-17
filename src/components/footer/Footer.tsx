import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import FooterLinks from "@/components/footer/FooterLinks";
import SocialIcons from "@/components/footer/SocialIcons";
import ContactUs from "@/components/footer/ContactUs";
import SignUpModal from "@/components/sign-up/SignUpModal.tsx";

const ContactsContainer = styled(Stack)(() => ({
    backgroundColor: '#000000',
    color: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

const Footer = () => {
    return (
        <Box component="footer" sx={{width: '100%', maxWidth: '100%'}}>
            <ContactsContainer spacing={1} direction={{xs: 'column', sm: 'row'}}>
                <ContactUs/>
                <SocialIcons/>
            </ContactsContainer>
            <FooterLinks/>
            <SignUpModal/>
        </Box>
    )
};

export default Footer;
