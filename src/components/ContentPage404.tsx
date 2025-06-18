import React from 'react';
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'
import {Link as NavLink} from 'react-router'
import Container from "@mui/material/Container";
import styled from "@emotion/styled";


const Content404Component = ({children}: { children: React.ReactNode }) => (
    <Grid size={{xs: 12, sm: 6}}
          sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        {children}
    </Grid>
);
const StyledImg = styled.img`
    max-width: 100%;
    width: 100%;
    height: auto;
    max-height: 50vh;
`
const ContentPage404 = () => {

    return (
        <Container maxWidth="md">
            <Grid container>
                <Content404Component>
                    <Typography variant="body1" sx={{fontSize: '2rem', textAlign: 'center', mb: 2}}>
                        It looks like the page you were looking for can&#39;t be found.
                    </Typography>
                    <Typography variant="body2">
                        If you&#39;re looking for a product, browse our <Link component={NavLink} to="/products/all">products
                        listing</Link>.
                    </Typography>
                </Content404Component>
                <Content404Component>
                    <StyledImg src="/images/chums/404-Booby.gif" alt="Page not found"/>
                </Content404Component>
            </Grid>
        </Container>
    )
}

export default ContentPage404;
