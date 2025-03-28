import {
    CartItem,
    CartProduct,
    CategoryChildCategory,
    CategoryChildLink,
    CategoryChildProduct,
    CategoryChildSection,
    CustomerPriceRecord,
    Product,
    ProductCategoryChild,
    SellAsColorsProduct,
    SellAsMixProduct,
    SellAsSelfProduct,
    SellAsVariantsProduct
} from "b2b-types";
import {priceRecord} from "@/utils/customer";
import {getItemPrice} from "@/utils/products";
import {PRICE_FIELDS, SELL_AS_COLORS, SELL_AS_MIX, SELL_AS_SELF, SELL_AS_VARIANTS} from "@/constants/product";
import {ProductsState} from "./index";

export const isCartItem = (item: CartItem | null): item is CartItem => {
    if (!item) {
        return false;
    }
    return (item as CartItem).itemCode !== undefined;
}

export const isCartProduct = (item: CartProduct | CartItem | null): item is CartProduct => {
    if (!item) {
        return false;
    }
    return isCartItem(item) && (item as CartProduct).productId !== undefined;
}

export const isProduct = (product: Product | null): product is Product => {
    if (!product) {
        return false;
    }
    return (product as Product).id !== undefined;
}


export const updateCartProductPricing = (item: CartProduct | null, pricing: CustomerPriceRecord[]): CartProduct | null => {
    if (!item) {
        return null;
    }
    return {
        ...item,
        priceCodeRecord: priceRecord({
            pricing: pricing ?? [],
            itemCode: item.itemCode,
            priceCode: item.priceCode,
        }),
        priceLevel: '',
        price: getItemPrice({
            item,
            priceField: PRICE_FIELDS.standard,
            priceCodes: pricing ?? [],
        })
    }
}


export function isCategoryChildSection(child: ProductCategoryChild): child is CategoryChildSection {
    return (child as CategoryChildSection).itemType === 'section';
}

export function isCategoryChildCategory(child: ProductCategoryChild): child is CategoryChildCategory {
    return (child as CategoryChildCategory).itemType === 'category';
}

export function isCategoryChildProduct(child: ProductCategoryChild): child is CategoryChildProduct {
    return (child as CategoryChildProduct).itemType === 'product';
}

export function isCategoryChildLink(child: ProductCategoryChild): child is CategoryChildLink {
    return (child as CategoryChildLink).itemType === 'link';
}

export function isSellAsSelf(product: Product | null): product is SellAsSelfProduct {
    return !!product && (product as SellAsSelfProduct).sellAs === SELL_AS_SELF;
}

export function isSellAsVariants(product: Product | null): product is SellAsVariantsProduct {
    return !!product && (product as SellAsVariantsProduct).sellAs === SELL_AS_VARIANTS;
}

export function isSellAsMix(product: Product | null): product is SellAsMixProduct {
    return !!product && (product as SellAsMixProduct).sellAs === SELL_AS_MIX;
}

export function isSellAsColors(product: Product | null): product is SellAsColorsProduct {
    return !!product && (product as SellAsColorsProduct).sellAs === SELL_AS_COLORS;
}


export function getImageItemCode(state: ProductsState): string | null {
    if (isSellAsSelf(state.selectedProduct)) {
        return state.selectedProduct.itemCode;
    }
    if (isSellAsMix(state.selectedProduct)) {
        const [imageItemCode] = state.selectedProduct.mix.items.filter(item => item.color?.code === state.colorCode);
        return imageItemCode?.itemCode ?? null;
    }
    return state.cartItem?.itemCode ?? null;

}
