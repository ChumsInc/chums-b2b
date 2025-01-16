import {createReducer} from "@reduxjs/toolkit";
import {PreloadedState} from "@typeDefs/preload";

export interface AppState {
    nonce: string | null;
}

export const initialAppState = (preload?: PreloadedState): AppState => ({
    nonce: preload?.app?.nonce ?? null,
})

const appReducer = createReducer(initialAppState, () => {
})

export default appReducer;
