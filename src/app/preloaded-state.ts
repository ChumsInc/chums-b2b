import {initialProductsState} from "@/ducks/products";
import {initialCustomerState} from "@/ducks/customer";
import {initialMessagesState} from "@/ducks/messages";
import {initialUserState} from "@/ducks/user";
import {initialAppState} from "@/ducks/app";
import {initialMenuState} from "@/ducks/menu";
import {initialKeywordsState} from "@/ducks/keywords";
import {initialCategoryState} from "@/ducks/category";
import {initialInvoicesState} from "@/ducks/invoices";
import {initialOpenOrderState} from "@/ducks/open-orders";
import {initialPageState} from "@/ducks/page";
import {initialPromoCodeState} from "@/ducks/promo-code";
import {initialSalesOrderState} from "@/ducks/sales-order";
import {initialSearchState} from "@/ducks/search";
import {initialVersionState} from "@/ducks/version";
import {PreloadedState} from "@/types/preload";
import {initialBannersState} from "@/ducks/banners";

export default function prepState(preload: PreloadedState = typeof globalThis.window === 'undefined' ? {} : globalThis.window.__PRELOADED_STATE__ ?? {}) {
    return {
        app: initialAppState(preload),
        banners: initialBannersState(preload),
        category: initialCategoryState(preload),
        customer: initialCustomerState(),
        invoices: initialInvoicesState(),
        keywords: initialKeywordsState(preload),
        menu: initialMenuState(preload),
        messages: initialMessagesState(preload),
        openOrders: initialOpenOrderState(),
        page: initialPageState(preload),
        products: initialProductsState(preload),
        promo_code: initialPromoCodeState(preload),
        salesOrder: initialSalesOrderState(),
        search: initialSearchState(),
        user: initialUserState(),
        version: initialVersionState(preload),
    }
};

