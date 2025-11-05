import type {PromoCode} from "chums-types/b2b";

export const promoCodeSorter = (a:PromoCode, b:PromoCode) => a.id - b.id;
