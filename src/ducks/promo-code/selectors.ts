import type {RootState} from "@/app/configureStore";

export const selectPromoCodesLoading = (state:RootState) => state.promoCode.loading;
export const selectCurrentPromoCode = (state:RootState) => state.promoCode.current;
