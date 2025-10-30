import {createSlice} from "@reduxjs/toolkit";
import {setLoggedIn} from "../user/actions";
import type {SignUpProfile} from "./types";
import {loadSignUpProfile, signUpUser} from "./actions";
import {isErrorResponse} from "@/utils/typeguards";

export interface SignUpState {
    profile: SignUpProfile | null;
    error: string | null;
    status: 'idle' | 'loading' | 'saving' | 'rejected' | 'success';
}

const initialState: SignUpState = {
    profile: null,
    error: null,
    status: 'idle',
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.status = 'saving';
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.status = action.payload?.success ? 'success' : 'rejected';
                state.error = action.payload?.message ?? 'An unexpected error occurred';
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.error.message ?? null;
            })
            .addCase(setLoggedIn, (state) => {
                state.profile = null;
            })
            .addCase(loadSignUpProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadSignUpProfile.fulfilled, (state, action) => {
                if (!isErrorResponse(action.payload)) {
                    state.profile = action.payload;
                }
                state.status = 'idle';
            })
            .addCase(loadSignUpProfile.rejected, (state) => {
                state.profile = null;
                state.status = 'idle';
            })
    },
    selectors: {
        selectSignUpProfile: (state) => state.profile,
        selectSignUpStatus: (state) => state.status,
        selectSignUpError: (state) => state.error,
    }
})

export default signUpSlice;
export const {selectSignUpProfile, selectSignUpStatus, selectSignUpError} = signUpSlice.selectors;
