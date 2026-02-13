import {type HTMLAttributes} from 'react';
import type {SearchResult} from "chums-types/b2b";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {NavLink} from "react-router";
import Stack from "@mui/material/Stack";
import {searchItemLink} from "@/ducks/search/utils.ts";
import SearchResultIcon from "@/components/search/SearchResultIcon.tsx";
import SearchResultTitle from "@/components/search/SearchResultTitle.tsx";

export interface SearchResultProps extends HTMLAttributes<HTMLLIElement> {
    option: SearchResult;
}

export default function SearchBarResult({option, ...props}: SearchResultProps) {
    const link = searchItemLink(option);

    return (
        <Box component="li" {...props} key={option.keyword}>
            <Link component={NavLink} to={link} sx={{width: '100%'}}>
                <Stack direction="row" sx={{width: '100%'}} alignItems="center">
                    <SearchResultIcon option={option}/>
                    <SearchResultTitle option={option}/>
                </Stack>
            </Link>
        </Box>
    )
}
