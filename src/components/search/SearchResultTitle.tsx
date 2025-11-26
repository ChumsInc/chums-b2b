import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type {SearchResult} from "chums-types/b2b";

const SearchResultTitleContainer = styled('div')`
    flex: 1 1 100%;
    padding-left: 0.25rem;
    text-align: center;
`

export default function SearchResultTitle( {option}: { option: SearchResult; }) {
    return (
        <SearchResultTitleContainer>
            <Box>
                <Typography variant="button">{option.title}</Typography>
            </Box>
            {!!option.additional_data?.subtitle && (
                <Box>
                    <Typography variant="caption">{option.additional_data.subtitle}</Typography>
                </Box>
            )}
        </SearchResultTitleContainer>
    )
}
