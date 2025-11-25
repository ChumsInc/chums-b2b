import ProductAttributeChip from "../ducks/products/components/ProductAttributeChip";
import Stack, {type StackProps} from "@mui/material/Stack";

export interface SeasonTeaserProps extends StackProps {
    teaser?: string | null;
    active?: boolean | null;
}

export default function SeasonTeaser({teaser, active, ...rest}: SeasonTeaserProps) {
    const show: boolean = !!active && !!teaser;
    if (!show) {
        return null;
    }

    return (
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" {...rest}>
            <ProductAttributeChip feature="new"/>
            <span>{teaser}</span>
        </Stack>
    );
};
