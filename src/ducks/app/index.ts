import {createReducer} from "@reduxjs/toolkit";

export interface AppState {
    nonce: string | null;
}

export const initialAppState: AppState = {
    nonce: null,
}

const appReducer = createReducer(initialAppState, () => {
})

export default appReducer;
