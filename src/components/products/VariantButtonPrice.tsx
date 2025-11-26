import type {CustomerPriceRecord, Product} from "chums-types/b2b";
import {useAppSelector} from "@/app/hooks.ts";
import {selectCustomerPricing} from "@/ducks/customer/customerPricingSlice.ts";
import {useEffect, useState} from "react";
import {getMSRP, getPrices, getSalesUM} from "@/utils/products.ts";
import numeral from "numeral";
import Typography from "@mui/material/Typography";

export interface VariantButtonPriceProps {
    product: Product;
    loggedIn: boolean;
}

export default function VariantButtonPrice({product, loggedIn}:VariantButtonPriceProps) {
    const priceCodes = useAppSelector(selectCustomerPricing);
    const [prices, setPrices] = useState(getUserPrices(product, priceCodes, loggedIn));
    const salesUM = getSalesUM(product);

    useEffect(() => {
        setPrices(getUserPrices(product, priceCodes, loggedIn));
    }, [product, loggedIn, priceCodes]);

    return (
        <Typography variant="variantButtonPrice">
            $ {prices.map(price => numeral(price).format('0.00')).join(' - ')}
            {' '}
            ({salesUM || 'EA'})
        </Typography>
    )
}


function getUserPrices(product: Product, priceCodes: CustomerPriceRecord[], loggedIn: boolean) {
    return loggedIn
        ? getPrices(product, priceCodes)
        : getMSRP(product);
}
