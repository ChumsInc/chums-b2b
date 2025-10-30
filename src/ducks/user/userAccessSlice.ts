import {
    createEntityAdapter,
    createSelector,
    createSlice,
    isAnyOf,
    type PayloadAction,
    type UnknownAction
} from "@reduxjs/toolkit";
import type {UserCustomerAccess} from "b2b-types";
import LocalStore from "@/utils/LocalStore.ts";
import {STORE_USER_ACCESS} from "@/constants/stores.ts";
import {loadProfile, saveUserProfile, setLoggedIn, setUserAccess, signInWithGoogle} from "@/ducks/user/actions.ts";
import {auth} from "@/api/IntranetAuthService.ts";
import {getPrimaryAccount, isCustomerAccess} from "@/ducks/user/utils.ts";
import {saveUser} from "@/ducks/customer/actions.ts";

export interface UserAccessState {
    current: UserCustomerAccess | null;
    status: 'idle' | 'loading' | 'rejected';
}

const adapter = createEntityAdapter<UserCustomerAccess, number>({
    selectId: (arg) => arg.id,
    sortComparer: (a, b) => a.id - b.id,
});

const selectors = adapter.getSelectors();

const initialState: UserAccessState = {
    current: LocalStore.getItem<UserCustomerAccess|null>(STORE_USER_ACCESS, null),
    status: 'idle'
};


const userAccessSlice = createSlice({
    name: 'userAccess',
    initialState: adapter.getInitialState(initialState),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (action.payload.loggedIn) {
                    if (!state.current) {
                        adapter.setAll(state, action.payload.accessList ?? []);
                        state.current = action.payload.access ?? null;
                    }
                } else {
                    adapter.removeAll(state);
                    state.current = null;
                }
            })
            .addCase(setUserAccess.pending, (state, action) => {
                state.current = action.meta.arg;
            })
            .addMatcher(isAnyOf(
                loadProfile.fulfilled,
                signInWithGoogle.fulfilled,
                saveUserProfile.fulfilled
            ), (state, action) => {
                const list = action.payload.accounts ?? [];
                adapter.setAll(state, list);
                if (isCustomerAccess(state.current) && !!state.current.id) {
                    const access = list.find(acct => isCustomerAccess(state.current) && acct.id === state.current.id);
                    state.current = access ?? null;
                }
                if (!isCustomerAccess(state.current) || !state.current?.id && list.length > 0) {
                    state.current = getPrimaryAccount(list) ?? null;
                }
            })
    },
    selectors: {
        selectAccessList: (state) => selectors.selectAll(state),
        selectUserAccessCount: (state) => selectors.selectTotal(state),
        selectCurrentAccess: (state) => state.current,
        selectAccessStatus: (state) => state.status,
    }
});

export default userAccessSlice;
export const {selectAccessList, selectCurrentAccess, selectAccessStatus, selectUserAccessCount} = userAccessSlice.selectors;

export const selectCanFilterReps = createSelector(
    [selectCurrentAccess],
    (account) => {
        return /[%_]+/.test(account?.SalespersonNo ?? '');
    }
)
export const selectRepAccessList = createSelector(
    [selectAccessList],
    (list) => list.filter(row => !!row.isRepAccount)
);
export const selectCustomerAccessList = createSelector(
    [selectAccessList],
    (list) => list.filter(row => !row.isRepAccount)
);
