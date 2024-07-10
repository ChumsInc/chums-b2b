import {CHANGE_USER_PASSWORD,} from "../../constants/actions";
import localStore from '../../utils/LocalStore';
import {
    STORE_AUTHTYPE,
    STORE_CURRENT_CART,
    STORE_CUSTOMER,
    STORE_CUSTOMER_SHIPPING_ACCOUNT,
    STORE_USER_ACCESS
} from '../../constants/stores';
import {auth} from '../../api/IntranetAuthService';
import {getProfile, getSignInProfile, getTokenExpiry} from "../../utils/jwtHelper";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {AUTH_LOCAL} from "../../constants/app";
import {
    selectLoggedIn,
    selectLoggingIn,
    selectResettingPassword,
    selectCurrentUserAccount,
    selectUserActionStatus,
    selectUserLoading
} from "./selectors";
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
} from "../../api/user";
import {createAction, createAsyncThunk, isFulfilled} from "@reduxjs/toolkit";
import {
    ChangePasswordProps,
    ChangePasswordResponse,
    SetLoggedInProps,
    SetNewPasswordProps,
    UserPasswordState,
    UserProfileResponse
} from "./types";
import {RootState} from "../../app/configureStore";
import {BasicCustomer, UserCustomerAccess, UserProfile} from "b2b-types";
import {isCustomerAccess} from "./utils";
import {StoredProfile} from "../../types/user";
import {loadCustomerList} from "../customers/actions";
import {isErrorResponse} from "../../utils/typeguards";
import {APIErrorResponse} from "../../types/generic";

export const setLoggedIn = createAction<SetLoggedInProps>('user/setLoggedIn');


export interface LoginUserProps {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk<string | APIErrorResponse, LoginUserProps>(
    'user/login',
    async (arg, {dispatch}) => {
        const res = await postLocalLogin(arg);
        if (!isErrorResponse(res)) {
            const token = res;
            auth.setToken(token);
            localStore.setItem(STORE_AUTHTYPE, AUTH_LOCAL);
            auth.setProfile(getProfile(token));
            const expires = getTokenExpiry(token);
            dispatch(setLoggedIn({loggedIn: true, authType: AUTH_LOCAL, token, expires}));
            const profileResponse = await dispatch(loadProfile());
            if (isFulfilled(profileResponse) && profileResponse.payload.accounts?.length === 1) {
                dispatch(loadCustomerList(profileResponse.payload.accounts[0]))
            }
        }
        return res;
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg.email && !!arg.password && !selectLoggingIn(state);
        }
    }
)

export const updateLocalAuth = createAsyncThunk<void, void>(
    'user/updateLocalAuth',
    async (_, {dispatch}) => {
        try {
            const token = await postLocalReauth();
            auth.setToken(token);
            auth.setProfile(getProfile(token));
            const expires = getTokenExpiry(token);
            dispatch(setLoggedIn({loggedIn: true, authType: AUTH_LOCAL, token, expires}));
        } catch (err: unknown) {
            if (err instanceof  Error) {
                console.log('updateLocalAuth()', err.message)
            }
            dispatch(setLoggedIn({loggedIn: false}));
            auth.removeToken();
            return;
        }
        dispatch(loadProfile());
    }, {
        condition: (_, {getState}) => {
            const state = getState() as RootState;
            const loggedIn = selectLoggedIn(state);
            const actionStatus = selectUserActionStatus(state);
            return loggedIn && actionStatus === 'idle';
        }
    }
)

export const signInWithGoogle = createAsyncThunk<UserProfileResponse, string>(
    'user/signInWithGoogle',
    async (arg) => {
        const response = await fetchGoogleLogin(arg);
        auth.setToken(response.token ?? arg);
        if (response.user) {
            const profile = getSignInProfile(arg);
            const {user, roles, accounts, token} = response;
            if (token) {
                auth.setToken(token);
            }
            const storedProfile: StoredProfile = {
                ...profile,
                chums: {
                    user: {
                        ...user,
                        roles: roles ?? [],
                        accounts: accounts ?? []
                    }
                }
            }
            response.picture = getSignInProfile(arg)?.imageUrl ?? null;
            auth.setProfile(storedProfile);
        }
        return response;
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState() as RootState;
            return !selectUserLoading(state);
        }
    }
)

export const logout = createAsyncThunk<void>(
    'user/logout',
    async (_arg, {dispatch}) => {
        await postLogout();
        auth.logout();
        localStore.removeItem(STORE_CUSTOMER);
        localStore.removeItem(STORE_USER_ACCESS);
        localStore.removeItem(STORE_AUTHTYPE);
        localStore.removeItem(STORE_CURRENT_CART);
        localStore.removeItem(STORE_CUSTOMER_SHIPPING_ACCOUNT);
        dispatch(setLoggedIn({loggedIn: false}));
    }
)

export const setUserAccess = createAsyncThunk<UserCustomerAccess | null, UserCustomerAccess | null>(
    'user/access/set',
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
            // if not a rep access, then the access should be treated specifically as a customer and not an access object.
            const state = getState() as RootState;
            return selectLoggedIn(state)
                && !!arg?.isRepAccount
                && selectCurrentUserAccount(state)?.id !== arg?.id;
        }
    }
)

export const loadProfile = createAsyncThunk<UserProfileResponse>(
    'user/loadProfile',
    async () => {
        return await fetchUserProfile();
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState() as RootState;
            return !selectUserLoading(state) && selectLoggedIn(state);
        }
    }
)

// export const changeUser = (props: Pick<UserProfile, 'name' | 'email'>) => ({type: CHANGE_USER, props});
export const changeUserPassword = (props: Partial<UserPasswordState>) => ({type: CHANGE_USER_PASSWORD, props});


export const changePassword = createAsyncThunk<ChangePasswordResponse, ChangePasswordProps>(
    'user/changePassword',
    async (arg) => {
        return await postPasswordChange(arg);
    },
    {
        condition: (_arg, {getState}) => {
            const state = getState() as RootState;
            return selectUserActionStatus(state) === 'idle';
        }
    }
)

export const setNewPassword = createAsyncThunk<ChangePasswordResponse | null, SetNewPasswordProps>(
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
            const state = getState() as RootState;
            return selectUserActionStatus(state) === 'idle';
        }
    }
)

export const resetPassword = createAsyncThunk<boolean, string>(
    'user/resetPassword',
    async (arg) => {
        return await postResetPassword(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg.trim()
                && !selectLoggedIn(state)
                && !selectResettingPassword(state);
        }
    }
)

export const saveUserProfile = createAsyncThunk<UserProfileResponse, Pick<UserProfile, 'name'>>(
    'user/saveProfile',
    async (arg) => {
        return await postUserProfile(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() as RootState;
            return !!arg.name.trim()
                && selectLoggedIn(state);
        }
    }
)
