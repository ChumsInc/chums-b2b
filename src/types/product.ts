export interface CartItemColorProps {
    colorCode?: string;
    itemCode?: string;
}

export interface ProductImage {
    filename: string | null;
    itemCode: string | null;
}

export type PriceField = 'stdPrice' | 'msrp';

export interface PriceFieldsList {
    [key: string]: PriceField;
}
