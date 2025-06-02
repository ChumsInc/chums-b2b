import React, {useEffect, useState} from "react";
import {getMSRP, getPrices, getSalesUM} from "@/utils/products";
import numeral from "numeral";
import {selectLoggedIn} from "../../user/selectors";
import {selectCustomerPricing} from "../../customer-pricing";
import {ProductVariant} from "b2b-types";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Stack, {StackProps} from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {useAppSelector} from "@/app/configureStore";


const VariantButtonBase = styled(Button)(() => ({
    width: '100%',
}));

export interface VariantButtonProps extends Pick<StackProps, 'direction' | 'spacing'> {
    variant: ProductVariant;
    selected: boolean;
    onClick: (variant: ProductVariant) => void;
}

const VariantButton = ({variant, selected, direction, spacing, onClick}: VariantButtonProps) => {
    const priceCodes = useAppSelector(selectCustomerPricing);
    const loggedIn = useAppSelector(selectLoggedIn);
    const [prices, setPrices] = useState<string[]>([]);
    const [salesUM, setSalesUM] = useState<string>(getSalesUM(variant.product));
    useEffect(() => {
        const prices = loggedIn
            ? getPrices(variant.product, priceCodes)
            : getMSRP(variant.product);
        setPrices(prices);
        setSalesUM(getSalesUM(variant.product));
    }, [loggedIn, priceCodes, variant.product]);

    return (
        <VariantButtonBase variant={selected ? 'contained' : 'outlined'}
                           onClick={() => onClick(variant)}>
            <Stack direction={direction ?? {xs: 'row', sm: 'column'}}
                   spacing={spacing ?? {xs: 2, sm: 0}} alignItems="center">
                <Box>
                    <Typography variant="variantButtonText">{variant.title}</Typography>
                </Box>
                <Box>
                    <Typography variant="variantButtonPrice">
                        $ {prices.map(price => numeral(price).format('0.00')).join(' - ')}
                        {' '}
                        ({salesUM || 'EA'})
                    </Typography>
                </Box>
            </Stack>
        </VariantButtonBase>
    )
}

export default VariantButton
