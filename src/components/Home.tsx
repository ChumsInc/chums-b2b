import React from 'react';
import {documentTitles} from "@/constants/paths";
import DocumentTitle from "./DocumentTitle";
import BannersList from "../ducks/banners/BannersList";
import Typography from "@mui/material/Typography";

const HomeV2 = () => {
    return (
        <div>
            <DocumentTitle documentTitle={documentTitles.home}/>
            <Typography component="h1" variant="h1" sx={{textAlign: 'center', mb: 3}}>Chums Business-to-Business Website</Typography>
            <BannersList/>
        </div>
    )
}
export default HomeV2;
