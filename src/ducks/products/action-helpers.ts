import type {
    CartProduct,
    CustomerPriceRecord,
    Product, ProductMixComponent,
    ProductVariant,
    SellAsColorsProduct,
    SellAsMixProduct,
    SellAsVariantsProduct
} from "chums-types/b2b";
import {defaultCartItem, defaultVariant, getMSRP, getPrices, getSalesUM, hasVariants} from "@/utils/products.ts";
import {isSellAsColors, isSellAsMix, updateCartProductPricing} from "@/ducks/products/utils.ts";
import {parseImageFilename} from "@/components/common/image.ts";
import type {RootState} from "@/app/configureStore.ts";
import {selectProductCustomerKey} from "@/ducks/products/selectors.ts";
import {selectCustomerPricing} from "@/ducks/customer/customerPricingSlice.ts";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice.ts";

export function loadProductVariantHelper(product: Product | null): ProductVariant | null {
    return hasVariants(product) ? defaultVariant(product as SellAsVariantsProduct) : null;
}

export function loadProductMSRPHelper(variant: ProductVariant | null, product: Product | null): string[] {
    return getMSRP(variant?.product ?? product)
}

export function loadProductCustomerPriceHelper(loggedIn: boolean, variant: ProductVariant | null, product: Product | null, pricing: CustomerPriceRecord[], msrp: string[]): string[] {
    return loggedIn
        ? getPrices(variant?.product ?? product, pricing)
        : [...msrp];
}

export function loadProductSalesUMHelper(variant: ProductVariant | null, product: Product | null): string {
    return getSalesUM(variant?.product ?? product)
}

export function loadProductCartProductHelper(variant: ProductVariant | null, product: Product | null): CartProduct | null {
    return defaultCartItem(variant?.product ?? product, {
        colorCode: variant?.product?.defaultColor || product?.defaultColor
    });
}

export interface SetColorCodeHelperProps {
    arg: string,
    existingCartItem: CartProduct | null,
    selectedProduct: SellAsColorsProduct | SellAsMixProduct,
    state: RootState
}

export function setColorCodeColorsHelper({
                                             arg,
                                             selectedProduct,
                                             existingCartItem,
                                             state
                                         }: SetColorCodeHelperProps): CartProduct | null {
    if (!isSellAsColors(selectedProduct)) {
        return null;
    }
    const cartItem = cartItemQuantityHelper({arg, selectedProduct, existingCartItem, state});
    return cartItemImageHelper(cartItem, selectedProduct)
}

function cartItemQuantityHelper({
                                    existingCartItem,
                                    selectedProduct,
                                    arg,
                                    state
                                }: SetColorCodeHelperProps): CartProduct | null {
    const quantity = existingCartItem?.quantity ?? 1;
    const uom = existingCartItem?.salesUM;
    const cartItem = defaultCartItem(selectedProduct, {colorCode: arg});
    if (cartItem && cartItem?.salesUM === uom) {
        cartItem.quantity = quantity;
    }
    return cartItemCustomerHelper(cartItem, state);
}

function cartItemCustomerHelper(cartItem: CartProduct | null, state: RootState) {
    const customerKey = selectProductCustomerKey(state);
    if (customerKey) {
        const customerPricedItem = updateCartProductPricing(cartItem, selectCustomerPricing(state));
        if (customerPricedItem) {
            customerPricedItem.priceLevel = selectCustomerAccount(state)?.PriceLevel ?? '';
        }
        return customerPricedItem;
    }
    return cartItem;
}

function cartItemImageHelper(cartItem: CartProduct | null, selectedProduct: SellAsColorsProduct,): CartProduct | null {
    if (cartItem && !cartItem.image) {
        cartItem.image = parseImageFilename(selectedProduct.image, cartItem?.colorCode ?? selectedProduct.defaultColor);
    }
    return cartItem;
}

export function setColorCodeMixHelper({
                                          arg,
                                          selectedProduct,
                                          existingCartItem,
                                          state
                                      }: SetColorCodeHelperProps): CartProduct | null {
    if (!isSellAsMix(selectedProduct)) {
        return null;
    }
    if (!existingCartItem) {
        return null;
    }
    const account = selectCustomerAccount(state);
    const item = selectedProduct.mix.items.find(_item => _item.color?.code === arg);
    const cartItem = {...existingCartItem};
    cartItem.priceLevel = account?.PriceLevel ?? '';
    cartItem.colorName = getColorName(item);
    cartItem.colorCode = getColorCode(item);
    cartItem.image = parseImageFilename(getImageFilename(item, selectedProduct, cartItem));
    return cartItem ?? null;
}

function getColorName(item:ProductMixComponent|undefined):string {
    return item?.color?.name ?? item?.color?.code ?? '';
}
function getColorCode(item:ProductMixComponent|undefined):string {
    return item?.color?.code ?? item?.color_code ?? '';
}

function getImageFilename(item:ProductMixComponent|undefined, selectedProduct:SellAsMixProduct, cartItem:CartProduct|null):string {
    return item?.additionalData?.image_filename
        ?? selectedProduct.image
        ?? cartItem?.colorCode
        ?? selectedProduct.defaultColor;
}
