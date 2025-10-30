import {sendGtagEvent} from "./api.ts";
import {isCategoryChildProduct, isSellAsColors, isSellAsMix} from "@/ducks/products/utils.ts";
import type {CartProduct, CategoryChildProduct, Product, ProductCategory} from "b2b-types";
import {canStoreAnalytics} from "@/ducks/cookie-consent/utils.ts";

export function ga4Exception(description: string, fatal: boolean) {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('exception', {description, fatal});
}

export function ga4Search(searchTerm: string) {
    if (!canStoreAnalytics())
    sendGtagEvent('search', {search_term: searchTerm.trim()});
}

export function ga4Login(method: 'credentials' | 'google') {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('login', {method})
}

export function ga4SignUp() {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('sign_up');
}

export function ga4PageView() {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('page_view');
}

export function ga4ViewItemList(category: ProductCategory) {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('view_item_list', {
        item_list_id: category.keyword,
        item_list_name: category.title ?? category.keyword,
        items: category.children.filter(child => isCategoryChildProduct(child))
            .map(child => ({
                item_id: (child as CategoryChildProduct).product.itemCode,
                item_name: (child as CategoryChildProduct).product.name,
            }))
    })
}

export function ga4SelectCustomer(customerSlug: string) {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('select_content', {
        content_type: 'customer',
        content_id: customerSlug!,
    })
}

export function ga4ViewItem(product: Product | null) {
    if (!canStoreAnalytics()) return;
    if (product) {
        sendGtagEvent('view_item', {
            items: [{
                item_id: product.itemCode,
                item_name: product.name,
            }]
        })
    }
}

export function ga4SelectColorItem(product: Product | null, cartItem: CartProduct | null) {
    if (!canStoreAnalytics()) return;
    if (cartItem) {
        if (isSellAsColors(product) && cartItem.colorCode !== product.defaultColor) {
            sendGtagEvent('select_item', {
                item_list_id: product.itemCode,
                item_list_name: product.description,
                items: [{
                    item_id: cartItem.itemCode,
                    item_name: cartItem.colorName ?? cartItem.colorCode ?? '',
                    price: cartItem.price ? +cartItem.price : undefined,
                    quantity: cartItem.quantity
                }]
            })
        }
    }
}

export function ga4SelectMixItem(product: Product | null, variantProduct: Product | undefined) {
    if (!canStoreAnalytics()) return;
    if (product && variantProduct && isSellAsMix(variantProduct)) {
        sendGtagEvent('select_item', {
            item_list_id: product.itemCode,
            item_list_name: [product.name, product.additionalData?.subtitle].filter(val => !!val).join(' / '),
            items: [{
                item_id: variantProduct.itemCode,
                item_name: `${variantProduct.name}${variantProduct.additionalData?.subtitle ? ' / ' + variantProduct.additionalData?.subtitle : ''}`
            }]
        });
    }
}

export function ga4SelectVariantItem(itemCode: string) {
    if (!canStoreAnalytics()) return;
    sendGtagEvent('select_content', {
        content_type: 'variant',
        content_id: itemCode
    });
}
