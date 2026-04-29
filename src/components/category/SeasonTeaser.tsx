import ProductAttributeChip from "../products/ProductAttributeChip.tsx";
import Stack, {type StackProps} from "@mui/material/Stack";

export interface SeasonTeaserProps extends StackProps {
    teaser?: string | null;
    active?: boolean | null;
}

export default function SeasonTeaser({teaser, active, sx, ...rest}: SeasonTeaserProps) {
    const show: boolean = !!active && !!teaser;
    if (!show) {
        return null;
    }

    return (
        <Stack direction="row" spacing={2} sx={{alignItems: 'center', justifyContent: 'center', ...sx}} {...rest}>
            <ProductAttributeChip feature="new"/>
            <span>{teaser}</span>
        </Stack>
    );
};
