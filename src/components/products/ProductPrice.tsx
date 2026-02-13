import React from 'react';
import numeral from "numeral";
import Box, {BoxProps} from "@mui/material/Box";

export interface ProductPriceProps {
    prices: (string|number)[];
    salesUM?: string|null;
    boxProps?: BoxProps;
}
export default function ProductPrice({prices, salesUM, boxProps}:ProductPriceProps) {
    return (
        <Box component="span" {...boxProps}>
            $ {prices.map(price => numeral(price).format('0,0.00')).join(' - ')}
            {!!salesUM && (
                <Box component="span" sx={{ml: 1}}>
                    ({salesUM ?? 'EA'})
                </Box>
            )}
        </Box>
    )
}
