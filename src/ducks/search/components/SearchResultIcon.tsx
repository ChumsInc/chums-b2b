import React from "react";
import {SearchResult} from "b2b-types";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";
import {styled} from "@mui/material/styles";
import {CONTENT_PATH_SEARCH_IMAGE} from "@/constants/paths";

const SearchResultType = styled('div')`
    flex: 0 0 25%;
    text-align: center;
`
const SearchImage = styled('img')`
    flex: 0 0 25%;
    display: block;
    max-width: 100%;
    height: auto;
`

export default function SearchResultIcon({option}: { option: SearchResult; }) {
    const src = CONTENT_PATH_SEARCH_IMAGE.replace(':image', encodeURIComponent(option.image ?? 'missing.png'));
    switch (option.pagetype) {
        case 'category':
            return (
                <SearchResultType><FolderIcon aria-label="Product Category"/></SearchResultType>
            )
        case 'page':
            return (
                <SearchResultType><DescriptionIcon aria-label="Information Page"/></SearchResultType>
            )
        case 'product':
            return (
                <SearchImage src={src} alt={option.keyword}/>
            )
        default:
            return null;
    }
}
