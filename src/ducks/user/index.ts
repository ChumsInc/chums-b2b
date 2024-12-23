import {auth} from '../../api/IntranetAuthService';
import localStore from "../../utils/LocalStore";
import LocalStore from "../../utils/LocalStore";
import {STORE_AUTHTYPE, STORE_AVATAR, STORE_CUSTOMER, STORE_USER_ACCESS} from "../../constants/stores";
import {getFirstCustomer,} from "../../utils/customer";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {createReducer, isRejected} from "@reduxjs/toolkit";
import {
    changePassword,
    loadProfile,
    loginUser,
    logoutUser,
    resetPassword,
    saveUserProfile,
    setLoggedIn,
    setNewPassword,
    setUserAccess,
    signInWithGoogle,
    updateLocalAuth
} from "./actions";
import {getPrimaryAccount, getUserType, is401Action, isCustomerAccess, isUserAction, userAccountSort} from "./utils";
import {UserPasswordState, UserSignupState, UserType} from "./types";
import {BasicCustomer, Editable, UserCustomerAccess, UserProfile} from "b2b-types";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {LoadStatus} from "../../types/generic";


export interface UserState {
    token: string | null;
    tokenExpires: number;
    profile: (UserProfile & Editable) | null;
    userType: UserType | null;
    picture: string | null;
    access: {
        list: UserCustomerAccess[],
        current: UserCustomerAccess | null,
        loading: boolean,
        loaded: boolean,
    };
    accounts: UserCustomerAccess[];
    roles: string[];
    loggedIn: boolean;
    currentCustomer: BasicCustomer | null;
    signUp: UserSignupState;
    authType: string;
    passwordChange: UserPasswordState;
    actionStatus: LoadStatus | 'saving-profile' | 'resetting-password' | 'logging-in' | 'setting-password' | 'logging-out';
}


export const initialUserState = (): UserState => {
    const existingToken = auth.getToken();
    let existingTokenExpires = 0;
    if (existingToken) {
        const decoded = jwtDecode<JwtPayload>(existingToken);
        existingTokenExpires = decoded?.exp ?? 0;
    }
    const isLoggedIn = auth.loggedIn();
    const profile = isLoggedIn ? (auth.getProfile() ?? null) : null
    const avatar = LocalStore.getItem<string | null>(STORE_AVATAR, null);
    const accounts = profile?.chums?.user?.accounts ?? [];
    const customer = isLoggedIn
        ? localStore.getItem<BasicCustomer | null>(STORE_CUSTOMER, getFirstCustomer(accounts) ?? null)
        : null;
    const currentAccess: UserCustomerAccess | null = isLoggedIn
        ? localStore.getItem<UserCustomerAccess | null>(STORE_USER_ACCESS, (accounts.length === 1 ? accounts[0] : null))
        : null;
    const authType = isLoggedIn ? localStore.getItem<string | null>(STORE_AUTHTYPE, null) : null;

    return {
        token: existingToken ?? null,
        tokenExpires: existingTokenExpires,
        profile: profile?.chums?.user ?? null,
        userType: getUserType(profile?.chums?.user ?? null),
        picture: avatar ?? profile?.imageUrl ?? null,
        accounts: profile?.chums?.user?.accounts ?? [],
        roles: profile?.chums?.user?.roles ?? [],
        loggedIn: isLoggedIn,
        currentCustomer: customer ?? null,
        access: {
            list: profile?.chums?.user?.accounts ?? [],
            current: currentAccess,
            loading: false,
            loaded: !!profile?.chums?.user?.accounts,
        },
        signUp: {
            email: '',
            authKey: '',
            authHash: '',
            error: null,
            loading: false,
        },
        authType: authType ?? '',
        passwordChange: {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            visible: false,
        },
        actionStatus: 'idle',
    }
}

const userReducer = createReducer(initialUserState, (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
            state.actionStatus = 'logging-in';
        })
        .addCase(loginUser.fulfilled, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(loginUser.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(updateLocalAuth.pending, (state) => {
            state.actionStatus = 'logging-in';
        })
        .addCase(updateLocalAuth.fulfilled, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(updateLocalAuth.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(setLoggedIn, (state, action) => {
            if (!state.loggedIn && action.payload?.loggedIn) {
                const _initialUserState = initialUserState();
                state.tokenExpires = _initialUserState.tokenExpires;
                state.profile = _initialUserState.profile;
                state.picture = _initialUserState.picture;
                state.accounts = _initialUserState.accounts;
                state.roles = _initialUserState.roles;
                state.access = _initialUserState.access;
                state.currentCustomer = _initialUserState.currentCustomer;
                state.authType = _initialUserState.authType;
            }
            state.loggedIn = action.payload.loggedIn;
            state.token = action.payload.token ?? null;
            state.tokenExpires = action.payload.expires ?? 0;
            if (!action.payload?.loggedIn) {
                const _initialUserState = initialUserState();
                state.token = null;
                state.tokenExpires = 0;
                state.profile = null;
                state.userType = null;
                state.accounts = [];
                state.roles = [];
                state.access.list = [];
                state.access.current = null;
                state.currentCustomer = null;
                state.signUp = {..._initialUserState.signUp};
                state.authType = '';
                state.passwordChange = {..._initialUserState.passwordChange};
                state.picture = null;
            }
        })
        .addCase(loadProfile.pending, (state) => {
            state.actionStatus = 'pending';
        })
        .addCase(loadProfile.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            state.profile = action.payload.user ?? null;
            state.userType = getUserType(state.profile);
            state.roles = (action.payload.roles ?? []).sort();
            state.accounts = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.list = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.loaded = true;
            if (isCustomerAccess(state.access.current) && !!state.access.current.id) {
                const [acct] = state.accounts.filter(acct => isCustomerAccess(state.access.current) && acct.id === state.access.current.id);
                state.access.current = acct ?? null;
            }
            if (!isCustomerAccess(state.access.current) || !state.access.current?.id && state.accounts.length > 0) {
                state.access.current = getPrimaryAccount(state.accounts) ?? null;
            }
        })
        .addCase(loadProfile.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(setCustomerAccount.fulfilled, (state, action) => {
            state.currentCustomer = action.payload.customer;
        })
        .addCase(loadCustomer.fulfilled, (state, action) => {
            if (action.payload?.customer) {
                const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = action.payload.customer;
                localStore.setItem<BasicCustomer>(STORE_CUSTOMER, {
                    ...state.currentCustomer,
                    ARDivisionNo,
                    CustomerNo,
                    CustomerName,
                    ShipToCode
                });
                state.currentCustomer = {ARDivisionNo, CustomerNo, CustomerName, ShipToCode};
            }
        })
        .addCase(setUserAccess.pending, (state, action) => {
            state.access.current = action.meta.arg;
            if (action.meta.arg && !action.meta.arg?.isRepAccount) {
                const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = action.meta.arg;
                state.currentCustomer = {ARDivisionNo, CustomerNo, CustomerName: CustomerName ?? undefined, ShipToCode};
            }

        })
        .addCase(signInWithGoogle.pending, (state) => {
            state.actionStatus = 'pending';
        })
        .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            state.token = action.payload.token ?? null;
            state.accounts = (action.payload.accounts ?? []).sort(userAccountSort);
            state.roles = (action.payload.roles ?? []).sort();
            state.loggedIn = !!(action.payload.user?.id ?? 0);
            state.picture = action.payload.picture ?? null;
            state.tokenExpires = action.payload.expires ?? 0;
        })
        .addCase(signInWithGoogle.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(resetPassword.pending, (state) => {
            state.actionStatus = 'resetting-password';
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(resetPassword.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(saveUserProfile.pending, (state) => {
            state.actionStatus = 'saving-profile';
        })
        .addCase(saveUserProfile.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            state.profile = action.payload.user ?? null;
            state.userType = getUserType(state.profile);
            state.roles = (action.payload.roles ?? []).sort();
            state.accounts = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.list = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.loaded = true;
            if (isCustomerAccess(state.access.current) && !!state.access.current.id) {
                const [acct] = state.accounts.filter(acct => isCustomerAccess(state.access.current) && acct.id === state.access.current.id);
                state.access.current = acct ?? null;
            }
            if (!isCustomerAccess(state.access.current) || !state.access.current?.id && state.accounts.length > 0) {
                state.access.current = getPrimaryAccount(state.accounts) ?? null;
            }
        })
        .addCase(saveUserProfile.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(setNewPassword.pending, (state) => {
            state.actionStatus = 'setting-password';
        })
        .addCase(setNewPassword.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            if (action.payload?.success) {
                // @TODO: do something here?
            }
        })
        .addCase(setNewPassword.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(changePassword.pending, (state) => {
            state.actionStatus = 'setting-password';
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            state.actionStatus = 'idle';
            if (action.payload.success) {
                state.loggedIn = false;
            }
        })
        .addCase(changePassword.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(logoutUser.pending, (state) => {
            state.actionStatus = 'logging-out';
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.actionStatus = 'idle';
        })
        .addCase(logoutUser.rejected, (state) => {
            state.actionStatus = 'idle';
        })
        .addMatcher((action) => isUserAction(action) && isRejected(action) && !!action.error,
            (state, action) => {
                if (isRejected(action)) {
                    console.log('userReducer', action?.error);
                }
            })
        .addMatcher(is401Action, (state) => {
            state.loggedIn = false;
            state.token = null;
            state.tokenExpires = 0;
        })
})
export default userReducer;

