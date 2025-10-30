import {createEntityAdapter, createSelector, createSlice} from "@reduxjs/toolkit";
import type {Salesperson} from "b2b-types";
import {salespersonKey, userRepListSort} from "@/ducks/user/utils.ts";
import {setLoggedIn} from "@/ducks/user/actions.ts";
import {loadRepList} from "@/ducks/reps/actions.ts";

const adapter = createEntityAdapter<Salesperson, string>({
    selectId: (arg) => salespersonKey(arg),
    sortComparer: (a, b) => salespersonKey(a).localeCompare(salespersonKey(b))
});

const selectors = adapter.getSelectors();

export interface SalespersonState {
    status: 'idle' | 'loading' | 'rejected';
    loaded: boolean;
}

const extraState: SalespersonState = {
    status: 'idle',
}

const salespersonSlice = createSlice({
    name: 'reps',
    initialState: adapter.getInitialState(extraState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload?.loggedIn) {
                    adapter.removeAll(state);
                    state.loaded = false;
                }
            })
            .addCase(loadRepList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadRepList.fulfilled, (state, action) => {
                state.status = 'idle';
                state.loaded = true;
                adapter.setAll(state, action.payload);
            })
            .addCase(loadRepList.rejected, (state) => {
                state.status = 'idle';
                state.loaded = true;
                adapter.removeAll(state);
            })
    },
    selectors: {
        selectAll: (state) => selectors.selectAll(state),
        selectRepsLoading: (state) => state.status,
        selectRepsLoaded: (state) => state.loaded,
    }
})

export default salespersonSlice;

export const {
    selectAll,
    selectRepsLoading,
    selectRepsLoaded,
} = salespersonSlice.selectors;

export const selectRepsList = createSelector(
    [selectAll],
    (list) => {
        return [...list]
            .sort(userRepListSort);
    }
)
