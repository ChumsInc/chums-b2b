import {PRICE_FIELDS, SELL_AS_MIX, SELL_AS_SELF} from "@/constants/product";
import {calcPrice, priceRecord} from "./customer";
import type {
    BasicProduct,
    CartProduct,
    CustomerPriceRecord,
    Product,
    ProductColorItem,
    SellAsVariantsProduct
} from "chums-types/b2b";
import Decimal from "decimal.js";
import type {CartItemColorProps, PriceField} from "../types/product";
import {isSellAsColors, isSellAsMix, isSellAsVariants} from "@/ducks/products/utils";
import {parseImageFilename2} from "@/components/common/image";

export const hasVariants = (product: Product | null): boolean => isSellAsVariants(product) && product.variants.filter(v => v.status).length > 0;

export const defaultVariant = (product: SellAsVariantsProduct) => {
    const activeVariants = product.variants.filter(v => v.status);
    const [variant = activeVariants[0]] = activeVariants.filter(v => v.isDefaultVariant);
    return variant;
};

export const getSalesUM = (product: Product | null | undefined): string => {
    if (!product) {
        return '';
    }

    if (isSellAsColors(product)) {
        const um: string[] = [];
        product.items
            .filter(item => !(!item.status || item.inactiveItem || item.productType === 'D' || !item.salesUM))
            .forEach(item => {
                if (!!item.salesUM && !um.includes(item.salesUM)) {
                    um.push(item.salesUM);
                }
            });
        return um.join(',');
    }
    return product.salesUM ?? '';
};

export const getItemPrice = ({item, priceField = PRICE_FIELDS.standard, priceCodes = []}: {
    item: CartProduct | ProductColorItem;
    priceField: PriceField;
    priceCodes: CustomerPriceRecord[]
}): string => {
    if (priceField === PRICE_FIELDS.msrp) {
        return new Decimal(item.msrp ?? 0).toFixed(2);
    }
    const priceCode = priceRecord({pricing: priceCodes, priceCode: item.priceCode, itemCode: item.itemCode});
    return new Decimal(calcPrice({stdPrice: (item[priceField] ?? 0), ...priceCode})).times(item.salesUMFactor ?? 1).toFixed(2);
};

export const getPrice = ({product, priceField = PRICE_FIELDS.standard, priceCodes = []}: {
    product: Product;
    priceField: PriceField;
    priceCodes?: CustomerPriceRecord[]
}): string[] => {
    const priceCode = priceRecord({pricing: priceCodes, itemCode: product.itemCode, priceCode: product.priceCode});
    if (isSellAsColors(product)) {
        const prices: string[] = [];
        product.items
            .filter(item => !(!item.status || item.inactiveItem || item.productType === 'D'))
            .filter(item => !!item[priceField])
            .forEach(item => {
                const price = getItemPrice({item, priceField, priceCodes});
                if (!prices.includes(price)) {
                    prices.push(price);
                }
            });
        if (prices.length === 0) {
            return [new Decimal(product.msrp ?? 0).toFixed(2)];
        }
        if (prices.length === 1) {
            return prices;
        }
        const sortedPrices = prices.sort((a, b) => new Decimal(a).gt(b) ? 1 : -1);
        return [sortedPrices[0], sortedPrices[sortedPrices.length - 1]];
    }

    switch (product.sellAs) {
        case SELL_AS_SELF:
        case SELL_AS_MIX:
            return [
                new Decimal(calcPrice({stdPrice: product[priceField] ?? 0, ...priceCode}))
                    .times(product.salesUMFactor ?? 1)
                    .toFixed(2)
            ];
        default:
            return [];
    }
};

export const getMSRP = (product: Product | null | undefined) => {
    if (!product) {
        return [];
    }
    return getPrice({product, priceField: PRICE_FIELDS.msrp});
};

export const getPrices = (product: Product | null | undefined, priceCodes: CustomerPriceRecord[] = []) => {
    if (!product) {
        return [];
    }
    return getPrice({product, priceField: PRICE_FIELDS.standard, priceCodes});
};

export const defaultCartItem = (product: Product | null, option?: CartItemColorProps): CartProduct | null => {
    if (isSellAsColors(product)) {
        const items = product.items.filter(item => item.status);
        let cartItem: ProductColorItem | undefined;
        [cartItem] = items.filter(item => item.itemCode === option?.itemCode);
        if (!cartItem) {
            [cartItem] = items.filter(item => item.colorCode === option?.colorCode || item.color.code === option?.colorCode);
        }
        if (!cartItem) {
            [cartItem] = items.filter(item => item.colorCode === product.defaultColor);
        }
        if (!cartItem && items.length) {
            cartItem = items[0];
        }
        if (!cartItem) {
            return null;
        }
        return colorCartItem(cartItem, product);
    }
    if (isSellAsMix(product)) {
        let [color] = product.mix.items.filter(item => item.color?.code === (option?.colorCode ?? product.defaultColor))
            .map(item => item.color);
        if (!color) {
            [color] = product.mix.items.filter(item => item.color?.code === product.defaultColor)
                .map(item => item.color);
        }
        // const colorName = color?.name ?? '';
        // const additionalData: ProductAdditionalData = {};
        const [filename] = product.mix.items
            .filter(item => item.color?.code === color?.code)
            .map(item => {
                if (item.additionalData && item.additionalData.image_filename) {
                    return item.additionalData.image_filename;
                }
                return null;
            });
        // if (image_filename) {
        //     additionalData.image_filename = image_filename ?? undefined;
        // }
        return {
            itemCode: product.itemCode,
            quantity: 1,
            productId: product.id,
            name: product.name,
            colorCode: color?.code,
            colorName: color?.name,
            image: filename ?? parseImageFilename2({image: product.image, colorCode: color?.code}),
            msrp: product.msrp,
            stdPrice: product.stdPrice,
            priceCode: product.priceCode,
            salesUM: product.salesUM,
            stdUM: product.stdUM,
            salesUMFactor: product.salesUMFactor,
            seasonCode: product.season_code,
            seasonAvailable: product.additionalData?.seasonAvailable || product.season_available,
            quantityAvailable: product.QuantityAvailable,
            season: product.season ?? null,
        };
    }
    if (!product) {
        return null;
    }
    return {
        image: product.image,
        name: product.name,
        productId: product.id,
        itemCode: product.itemCode,
        stdPrice: product.stdPrice,
        salesUM: product.salesUM,
        salesUMFactor: product.salesUMFactor,
        quantityAvailable: product.QuantityAvailable,
        msrp: product.msrp,
        quantity: 1,
        seasonCode: product.season_code,
        seasonAvailable: product.season_available
    };
};

const isPreSeason = (item: ProductColorItem, product?: BasicProduct): boolean => {
    if (item.additionalData?.season && item.additionalData.season.active) {
        return !(item.additionalData.seasonAvailable || item.additionalData.season.product_available)
    }
    if (product?.season && product.season.active) {
        return !product.season.product_available;
    }
    return false;
}

export function colorCartItem(item: ProductColorItem, product?: BasicProduct): CartProduct {
    return {
        quantityAvailable: item.QuantityAvailable,
        msrp: item.msrp,
        colorCode: item.color.code ?? item.colorCode,
        itemCode: item.itemCode,
        stdPrice: item.stdPrice,
        salesUM: item.salesUM,
        salesUMFactor: item.salesUMFactor,
        colorName: item.color.name ?? item.colorName,
        priceCode: item.priceCode,
        price: item.msrp?.toString(),
        productId: item.productId,
        stdUM: item.stdUM,
        image: (item.additionalData?.image_filename ?? '') || parseImageFilename2({
            image: product?.image ?? '',
            colorCode: item.color.code ?? item.colorCode ?? ''
        }),
        name: product?.name ?? item.colorName,
        quantity: 1,
        season: item.additionalData?.season ?? product?.season ?? null,
        seasonCode: item.additionalData?.season?.code,
        seasonAvailable: !isPreSeason(item, product),
        seasonDescription: item.additionalData?.season?.description,
        seasonTeaser: item.additionalData?.season?.product_teaser,
        preSeasonMessage: (item.additionalData?.season?.product_available || item.additionalData?.seasonAvailable)
            ? null
            : (item.additionalData?.season?.preSeasonMessage ?? product?.preSeasonMessage ?? product?.dateAvailable),
        message: item.additionalData?.message,
    }
}


export const parseColor = (str: string, colorCode: string = ''): string => {
    let _colorCode = colorCode;
    let _str = str;
    if (!_str) {
        return '';
    }
    _colorCode = String(_colorCode);

    _str = _str.replace(/\?/, _colorCode);
    _str = _colorCode.split('').reduce((acc, code) => acc.replace(/\*/g, code), _str);
    return _str.replace(/\*/g, '');
};
