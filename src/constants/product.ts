import {ProductSellAsColors, ProductSellAsMix, ProductSellAsSelf, ProductSellAsVariants} from "b2b-types";
import {PriceFieldsList} from "@typeDefs/product";

export const SELL_AS_VARIANTS: ProductSellAsVariants = 0;
export const SELL_AS_SELF: ProductSellAsSelf = 1;
export const SELL_AS_MIX: ProductSellAsMix = 3;
export const SELL_AS_COLORS: ProductSellAsColors = 4;

export const PRICE_FIELDS: PriceFieldsList = {
    standard: 'stdPrice',
    msrp: 'msrp'
};
