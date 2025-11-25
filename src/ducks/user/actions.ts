import localStore from '../../utils/LocalStore';
import LocalStore from '../../utils/LocalStore';
import {
    STORE_AUTHTYPE,
    STORE_AVATAR,
    STORE_CURRENT_CART,
    STORE_CUSTOMER,
    STORE_CUSTOMER_SHIPPING_ACCOUNT,
    STORE_RECENT_ACCOUNTS,
    STORE_USER_ACCESS
} from '@/constants/stores';
import {auth} from '@/api/IntranetAuthService';
import {getProfile, getTokenExpiry} from "@/utils/jwtHelper";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {AUTH_LOCAL} from "@/constants/app";
import {
    selectLoggedIn,
    selectLoggingIn,
    selectResettingPassword,
    selectUserActionStatus,
    selectUserLoading
} from "./userProfileSlice";
import {
    fetchGoogleLogin,
    fetchUserProfile,
    postLocalLogin,
    postLocalReauth,
    postLogout,
    postNewPassword,
    postPasswordChange,
    postResetPassword,
    postUserProfile
} from "@/api/user";
import {createAction, createAsyncThunk, isFulfilled} from "@reduxjs/toolkit";
import type {
    ChangePasswordProps,
    ChangePasswordResponse,
    SetLoggedInProps,
    SetNewPasswordProps,
    UserProfileResponse
} from "./types";
import type {RootState} from "@/app/configureStore";
import type {BasicCustomer, RecentCustomer, UserCustomerAccess, UserProfile} from "chums-types/b2b";
import {isCustomerAccess} from "./utils";
import {loadCustomerList} from "../customers/actions";
import {isErrorResponse} from "@/utils/typeguards";
import type {APIErrorResponse} from "@/types/generic";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";
import {setLoggedInHelper, signInWithGoogleHelper} from "@/ducks/user/action-helpers";

export const setLoggedIn = createAction('user/setLoggedIn', (arg: SetLoggedInProps) => {
    if (arg.loggedIn) {
        return {
            payload: {
                ...setLoggedInHelper(arg)
            }
        }
    }
    return {
        payload: {
            ...arg
        }
    }
});


export const loadProfile = createAsyncThunk<UserProfileResponse, void, { state: RootState }>(
    'user/loadProfile',
    async () => {
        return await fetchUserProfile();
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState();
            return !selectUserLoading(state) && selectLoggedIn(state);
        }
    }
)

export interface LoginUserProps {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk<string | APIErrorResponse, LoginUserProps, { state: RootState }>(
    'user/login',
    async (arg, {dispatch}) => {
        const res = await postLocalLogin(arg);
        if (!isErrorResponse(res)) {
            const token = res;
            auth.setToken(token);
            localStore.setItem(STORE_AUTHTYPE, AUTH_LOCAL);
            auth.setProfile(getProfile(token));
            const expires = getTokenExpiry(token);
            const recentCustomers = localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, []);
            dispatch(setLoggedIn({loggedIn: true, authType: AUTH_LOCAL, token, expires, recentCustomers}));
            const profileResponse = await dispatch(loadProfile());
            if (isFulfilled(profileResponse) && profileResponse.payload.accounts?.length === 1) {
                dispatch(loadCustomerList(profileResponse.payload.accounts[0]))
            }

        }
        return res;
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.email && !!arg.password && !selectLoggingIn(state);
        }
    }
)

export const updateLocalAuth = createAsyncThunk<void, void, { state: RootState }>(
    'user/updateLocalAuth',
    async (_, {dispatch}) => {
        try {
            const token = await postLocalReauth();
            if (!token) {
                dispatch(setLoggedIn({loggedIn: false}));
                auth.removeToken();
                return;
            }
            auth.setToken(token);
            auth.setProfile(getProfile(token));
            const expires = getTokenExpiry(token);
            dispatch(setLoggedIn({loggedIn: true, authType: AUTH_LOCAL, token, expires}));
        } catch (err: unknown) {
            dispatch(setLoggedIn({loggedIn: false}));
            auth.removeToken();
            return;
        }
        dispatch(loadProfile());
    }, {
        condition: (_, {getState}) => {
            const state = getState();
            const loggedIn = selectLoggedIn(state);
            const actionStatus = selectUserActionStatus(state);
            return loggedIn && actionStatus === 'idle';
        }
    }
)

export const signInWithGoogle = createAsyncThunk<UserProfileResponse, string, { state: RootState }>(
    'user/signInWithGoogle',
    async (arg) => {
        const response = await fetchGoogleLogin(arg);
        auth.setToken(response.token ?? arg);
        return signInWithGoogleHelper(response, arg);
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState();
            return !selectUserLoading(state);
        }
    }
)

export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
    'user/logoutUser',
    async (_arg, {dispatch}) => {
        try {
            await postLogout()
            auth.logout();
        } catch (err: unknown) {
            // ignore error
        }
        localStore.removeItem(STORE_CUSTOMER);
        localStore.removeItem(STORE_USER_ACCESS);
        localStore.removeItem(STORE_AUTHTYPE);
        localStore.removeItem(STORE_CURRENT_CART);
        localStore.removeItem(STORE_CUSTOMER_SHIPPING_ACCOUNT);
        dispatch(setLoggedIn({loggedIn: false}));
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectUserActionStatus(state) === 'idle';
        }
    }
)

export const setUserAccess = createAsyncThunk<UserCustomerAccess | null, UserCustomerAccess | null, {
    state: RootState
}>(
    'userAccess/setCurrent',
    async (arg, {dispatch}) => {
        localStore.setItem<UserCustomerAccess | null>(STORE_USER_ACCESS, arg);
        if (isCustomerAccess(arg)) {
            if (!arg.isRepAccount) {
                const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = arg;
                dispatch(setCustomerAccount({ARDivisionNo, CustomerNo, ShipToCode}));
                dispatch(loadCustomer(arg));
                localStore.setItem<BasicCustomer>(STORE_CUSTOMER, {
                    ARDivisionNo,
                    CustomerNo,
                    CustomerName: CustomerName ?? ''
                });
            } else {
                dispatch(loadCustomerList(arg));
            }
        }
        return arg;
    },
    {
        condition: (arg, {getState}) => {
            // only set the user access if the access is a rep account
            // if not a rep access list, then the access should be treated specifically as a customer and not an access object.
            const state = getState();
            return selectLoggedIn(state)
                && !!arg?.isRepAccount
                && selectCurrentAccess(state)?.id !== arg?.id;
        }
    }
)

export const changePassword = createAsyncThunk<ChangePasswordResponse, ChangePasswordProps, { state: RootState }>(
    'user/changePassword',
    async (arg) => {
        return await postPasswordChange(arg) ?? {
            success: false,
            error: 'Unknown error changing password.'
        };
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState();
            return selectUserActionStatus(state) === 'idle';
        }
    }
)

export const setNewPassword = createAsyncThunk<ChangePasswordResponse | null, SetNewPasswordProps, {
    state: RootState
}>(
    'user/setNewPassword',
    async (arg) => {
        const res = await postNewPassword(arg);
        if (res?.success) {
            // redirect('/login')
        }
        return res;
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState();
            return selectUserActionStatus(state) === 'idle';
        }
    }
)

export const resetPassword = createAsyncThunk<boolean, string, { state: RootState }>(
    'user/resetPassword',
    async (arg) => {
        return await postResetPassword(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.trim()
                && !selectLoggedIn(state)
                && !selectResettingPassword(state);
        }
    }
)

export const saveUserProfile = createAsyncThunk<UserProfileResponse, Pick<UserProfile, 'name'>, { state: RootState }>(
    'user/saveProfile',
    async (arg) => {
        return await postUserProfile(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return !!arg.name.trim()
                && selectLoggedIn(state);
        }
    }
)

export const setAvatar = createAction('user/setAvatar', (arg: string | null) => {
    if (arg) {
        LocalStore.setItem<string>(STORE_AVATAR, arg);
    } else {
        LocalStore.removeItem(STORE_AVATAR);
    }
    return {
        payload: arg
    }
});
