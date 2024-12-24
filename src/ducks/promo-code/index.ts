import {createReducer} from "@reduxjs/toolkit";
import {PreloadedState} from "@typeDefs/preload";
import {PromoCode} from "b2b-types";
import {loadPromoCode, loadPromoCodes} from "./actions";
import {promoCodeSorter} from "./utils";
import {setLoggedIn} from "../user/actions";


export interface PromoCodeState {
    current: PromoCode | null;
    list: PromoCode[];
    loading: boolean;
}

export const initialPromoCodeState = (preload: PreloadedState = {}): PromoCodeState => ({
    current: preload?.promoCodes?.current ?? null,
    list: preload?.promoCodes?.list ?? [],
    loading: false,
})

const promoCodeReducer = createReducer(initialPromoCodeState, (builder) => {
    builder
        .addCase(loadPromoCodes.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadPromoCodes.fulfilled, (state, action) => {
            state.loading = false;
            state.list = action.payload.sort(promoCodeSorter);
            const [promo] = action.payload.filter(pc => !pc.require_code_entry);
            if (!state.current) {
                state.current = promo ?? null;
            }
        })
        .addCase(loadPromoCodes.rejected, (state) => {
            state.loading = false;
        })
        .addCase(loadPromoCode.pending, (state) => {
            state.loading = true;
        })
        .addCase(loadPromoCode.fulfilled, (state, action) => {
            state.current = action.payload;
            const list = state.list.filter(pc => pc.promo_code !== action.meta.arg);
            if (action.payload) {
                list.push(action.payload);
            }
            state.list = list.sort(promoCodeSorter);
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!action.payload?.loggedIn) {
                state.list = [];
                state.current = null;
            }
        });
});

export default promoCodeReducer;
