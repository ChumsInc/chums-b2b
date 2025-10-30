import {type RootState} from "@/app/configureStore";

export const selectAppNonce = (state:RootState) => state.app.nonce;
