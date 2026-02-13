import {PRICE_LEVELS} from "@/constants/orders.ts";
import Typography from "@mui/material/Typography";

export interface PriceLevelNoticeProps {
    priceLevel?: string;
}
const PriceLevelNotice = ({priceLevel = ''}:PriceLevelNoticeProps) => {
    if (!priceLevel || !PRICE_LEVELS[priceLevel]) {
        return null;
    }
    return (
        <Typography component="div" variant="body2">{PRICE_LEVELS[priceLevel]} Price</Typography>
    )
};

export default PriceLevelNotice;
