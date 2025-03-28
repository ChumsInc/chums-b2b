import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {PromoCode} from "b2b-types";
import {fetchPromoCode, fetchPromoCodes} from "@/api/promoCodes";
import {RootState} from "@/app/configureStore";
import {selectPromoCodesLoading} from "./selectors";

export const loadPromoCodes = createAsyncThunk<PromoCode[], void, {state: RootState}>(
    'promoCodes/load',
    async () => {
        return await fetchPromoCodes();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !selectPromoCodesLoading(state);
        }
    }
)

export const setPromoCode = createAction<PromoCode | null>('promoCodes/setCurrent');

export const loadPromoCode = createAsyncThunk<PromoCode | null, string, {state: RootState}>(
    'promoCodes/current/load',
    async (arg) => {
        const promoCode = await fetchPromoCode(arg);
        if (!promoCode) {
            return Promise.reject(new Error(`Sorry! '${arg}' is not a valid promo code.`));
        }
        return promoCode;
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !selectPromoCodesLoading(state);
        }
    }
)
