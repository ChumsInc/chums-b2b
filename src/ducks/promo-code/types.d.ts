import type {PromoCode} from "chums-types/b2b";

export interface PromoCodeState {
    code: string;
    description: string;
    requiredItems: string[];
    validCodes: PromoCode[];
    loading: boolean;
}
