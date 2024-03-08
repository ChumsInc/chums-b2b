import React from 'react';
import HomeSlideSet from "../ducks/slides/components/HomeSlideSet";
import {DOCUMENT_TITLES} from "../constants/paths";
import DocumentTitle from "./DocumentTitle";
import BannersList from "../ducks/banners/BannersList";

const HomeV2 = () => {
    return (
        <div>
            <DocumentTitle documentTitle={DOCUMENT_TITLES.home}/>
            <BannersList />
        </div>
    )
}
export default HomeV2;