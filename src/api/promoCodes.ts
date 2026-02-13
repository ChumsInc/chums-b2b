import type {PromoCode} from "chums-types/b2b";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";


export async function fetchPromoCodes():Promise<PromoCode[]> {
    try {
        const res = await fetchJSON<{promo_codes: PromoCode[]}>('/api/sales/b2b/promo/?valid=1', {cache: 'no-cache'});
        return res?.promo_codes ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("loadPromoCodes()", err.message);
            return Promise.reject(err);
        }
        debug("loadPromoCodes()", err);
        return Promise.reject(new Error('Error in loadPromoCodes()'));
    }
}

export async function fetchPromoCode(arg:string):Promise<PromoCode|null> {
    try {
        const url = '/api/sales/b2b/promo/:code?valid=1'
            .replace(':code', encodeURIComponent(arg));
        const res = await fetchJSON<{promo_codes:PromoCode[]}>(url, {cache: 'no-cache'});
        const [promo] = (res?.promo_codes ?? []);
        return promo ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchPromoCode()", err.message);
            return Promise.reject(err);
        }
        debug("fetchPromoCode()", err);
        return Promise.reject(new Error('Error in fetchPromoCode()'));
    }
}
