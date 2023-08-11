import {
    CHANGE_USER,
    CHANGE_USER_PASSWORD,
    CLEAR_USER_ACCOUNT,
    FETCH_CUSTOMER,
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_LOCAL_LOGIN,
    FETCH_REP_LIST,
    FETCH_REP_LIST_FAILURE,
    FETCH_SUCCESS,
    FETCH_USER_CUSTOMERS,
    FETCH_USER_SIGNUP,
    RECEIVE_REP_LIST,
    SET_LOGGED_IN,
    UPDATE_LOGIN,
    UPDATE_SIGNUP
} from "@/constants/actions";
import {auth} from '@/api/IntranetAuthService';
import localStore from "../../utils/LocalStore";
import {STORE_AUTHTYPE, STORE_CUSTOMER, STORE_RECENT_ACCOUNTS, STORE_USER_ACCOUNT} from "@/constants/stores";
import {buildRecentAccounts, customerListSorter, getFirstCustomer,} from "@/utils/customer";
import jwtDecode, {JwtPayload} from "jwt-decode";
import {createReducer} from "@reduxjs/toolkit";
import {loadCustomerList, loadProfile, loadRepList, setLoggedIn, setUserAccount, signInWithGoogle} from "./actions";
import {getPrimaryAccount, isCustomerAccess, userAccountSort, userRepListSort} from "./utils";
import {UserLoginState, UserPasswordState, UserSignupState} from "./types";
import {
    BasicCustomer,
    Customer,
    Editable,
    RecentCustomer,
    Salesperson,
    UserCustomerAccess,
    UserProfile
} from "b2b-types";
import {loadCustomer, setCustomerAccount} from "../customer/actions";
import {ExtendedUserProfile} from "../../_types";


export interface UserState {
    token: string | null;
    tokenExpires: number;
    user: (UserProfile & Editable) | null;
    profile: (ExtendedUserProfile & Editable) | null;
    picture: string | null;
    access: {
        list: UserCustomerAccess[],
        selected: UserCustomerAccess | null,
        loading: boolean,
        loaded: boolean,
    };
    accounts: UserCustomerAccess[];
    roles: string[];
    loggedIn: boolean;
    userAccount: UserCustomerAccess | null;
    currentCustomer: BasicCustomer | null;
    customerList: {
        list: Customer[];
        loading: boolean;
        loaded: boolean;
        filter: string;
        repFilter: string;
    };
    repList: {
        list: Salesperson[];
        loading: boolean;
        loaded: boolean;
    };
    signUp: UserSignupState;
    recentAccounts: RecentCustomer[];
    authType: string;
    passwordChange: UserPasswordState;
    login: UserLoginState;
    loading: boolean;
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
    const accounts = profile?.chums?.user?.accounts ?? [];
    const customer = isLoggedIn
        ? localStore.getItem<BasicCustomer | null>(STORE_CUSTOMER, getFirstCustomer(accounts) ?? null)
        : null;
    const userAccount: UserCustomerAccess | null = isLoggedIn
        ? localStore.getItem<UserCustomerAccess | null>(STORE_USER_ACCOUNT, null)
        : null;
    const recentAccounts = isLoggedIn
        ? localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, [])
        : [];
    const authType = localStore.getItem<string>(STORE_AUTHTYPE, '');

    return {
        token: existingToken ?? null,
        tokenExpires: existingTokenExpires,
        user: profile?.chums?.user ?? null,
        profile: profile?.chums?.user ?? null,
        picture: profile?.imageUrl ?? null,
        accounts: profile?.chums?.user?.accounts ?? [],
        roles: profile?.chums?.user?.roles ?? [],
        loggedIn: isLoggedIn,
        userAccount: userAccount,
        currentCustomer: customer ?? null,
        access: {
            list: profile?.chums?.user?.accounts ?? [],
            selected: userAccount,
            loading: false,
            loaded: !!profile?.chums?.user?.accounts,
        },
        customerList: {
            list: [],
            loading: false,
            loaded: false,
            filter: '',
            repFilter: '',
        },
        repList: {
            list: [],
            loading: false,
            loaded: false,
        },
        signUp: {
            email: '',
            authKey: '',
            authHash: '',
            error: null,
            loading: false,
        },
        recentAccounts: recentAccounts ?? [],
        authType: authType ?? '',
        passwordChange: {
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            visible: false,
        },
        login: {
            email: '',
            password: '',
            forgotPassword: false,
            loading: false,
        },
        loading: false,
    }
}

const userReducer = createReducer(initialUserState, (builder) => {
    builder
        .addCase(setLoggedIn, (state, action) => {
            if (!state.loggedIn && action.payload.loggedIn) {
                const _initialUserState = initialUserState();
                state.tokenExpires = _initialUserState.tokenExpires;
                state.user = _initialUserState.user;
                state.profile = _initialUserState.profile;
                state.accounts = _initialUserState.accounts;
                state.roles = _initialUserState.roles;
                state.userAccount = _initialUserState.userAccount;
                state.currentCustomer = _initialUserState.currentCustomer;
                state.recentAccounts = _initialUserState.recentAccounts;
            }
            state.loggedIn = action.payload.loggedIn;
            state.token = action.payload.token ?? null;
            if (!action.payload.loggedIn) {
                const _initialUserState = initialUserState();
                state.token = null;
                state.tokenExpires = 0;
                state.user = null;
                state.profile = null;
                state.accounts = [];
                state.roles = [];
                state.userAccount = null;
                state.access.list = [];
                state.access.selected = null;
                state.currentCustomer = null;
                state.customerList = {
                    list: [],
                    loading: false,
                    loaded: false,
                    filter: '',
                    repFilter: '',
                }
                state.repList = {
                    list: [],
                    loading: false,
                    loaded: false,
                }
                state.signUp = {..._initialUserState.signUp};
                state.recentAccounts = [];
                state.authType = '';
                state.passwordChange = {..._initialUserState.passwordChange};
                state.login = {..._initialUserState.login};
            }
        })
        .addCase(loadProfile.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user ?? null;
            if (action.payload.user) {
                state.profile = {
                    ...action.payload.user,
                    accounts: action.payload.accounts ?? [],
                    roles: (action.payload.roles ?? []).sort(),
                }
            } else {
                state.profile = null;
            }
            state.roles = (action.payload.roles ?? []).sort();
            state.accounts = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.list = (action.payload.accounts ?? []).sort(userAccountSort);
            state.access.loaded = true;
            if (isCustomerAccess(state.userAccount) && !!state.userAccount.id) {
                const [acct] = state.accounts.filter(acct => isCustomerAccess(state.userAccount) && acct.id === state.userAccount.id);
                state.userAccount = acct ?? null;
                state.access.selected = acct ?? null;
            }
            if (!isCustomerAccess(state.userAccount) || !state.userAccount?.id && state.accounts.length > 0) {
                state.userAccount = getPrimaryAccount(state.accounts) ?? null;
            }
            state.repList.list = [...(action.payload?.reps ?? [])].sort(userRepListSort);
            state.repList.loaded = true;
        })
        .addCase(loadProfile.rejected, (state, action) => {
            state.loading = false;
        })
        .addCase(loadRepList.pending, (state) => {
            state.repList.loading = true;
        })
        .addCase(loadRepList.fulfilled, (state, action) => {
            state.repList.loading = false;
            state.repList.list = [...(action.payload ?? [])].sort(userRepListSort);
            state.repList.loaded = true;
        })
        .addCase(loadRepList.rejected, (state) => {
            state.repList.loading = false;
            state.repList.list = [];
            state.repList.loaded = false;
        })
        .addCase(setCustomerAccount.fulfilled, (state, action) => {
            state.currentCustomer = action.payload.customer;
            state.recentAccounts = action.payload.recent;
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
                state.recentAccounts = buildRecentAccounts(state.recentAccounts, {
                    ARDivisionNo,
                    CustomerNo,
                    CustomerName
                });
            }
        })
        .addCase(loadCustomerList.pending, (state) => {
            state.customerList.loading = true;
        })
        .addCase(loadCustomerList.fulfilled, (state, action) => {
            state.customerList.loading = false;
            state.customerList.loaded = true;
            state.customerList.list = action.payload.sort(customerListSorter({field: 'CustomerNo', ascending: true}))
        })
        .addCase(loadCustomerList.rejected, (state, action) => {
            state.customerList.list = []
        })
        .addCase(setUserAccount.pending, (state, action) => {
            state.userAccount = action.meta.arg;
            state.access.selected = action.meta.arg;
            if (action.meta.arg && !action.meta.arg?.isRepAccount) {
                const {ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = action.meta.arg;
                state.currentCustomer = {ARDivisionNo, CustomerNo, CustomerName: CustomerName ?? undefined, ShipToCode};
            }

        })
        .addCase(signInWithGoogle.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.loading = false;
            state.token = action.meta.arg;
            state.profile = action.payload.user ?? null;
            state.accounts = (action.payload.accounts ?? []).sort(userAccountSort);
            state.roles = (action.payload.roles ?? []).sort();
            state.loggedIn = !!(action.payload.user?.id ?? 0);
        })
        .addCase(signInWithGoogle.rejected, (state) => {
            state.loading = false;
        })
        .addDefaultCase((state, action) => {
            const _initialUserState = initialUserState();
            // console.log(action.type, JSON.parse(JSON.stringify(state)), action);
            switch (action.type) {
                case SET_LOGGED_IN:
                    state.loggedIn = action.loggedIn === true;
                    if (!action.loggedIn) {
                        state.token = null;
                        state.tokenExpires = 0;
                        state.profile = null;
                        state.accounts = [];
                        state.roles = [];
                        state.userAccount = null;
                        state.access.list = [];
                        state.access.selected = null;
                        state.currentCustomer = null;
                        state.customerList = {
                            list: [],
                            loading: false,
                            loaded: false,
                            filter: '',
                            repFilter: '',
                        }
                        state.repList = {
                            list: [],
                            loading: false,
                            loaded: false,
                        }
                        state.signUp = {..._initialUserState.signUp};
                        state.recentAccounts = [];
                        state.authType = '';
                        state.passwordChange = {..._initialUserState.passwordChange};
                        state.login = {..._initialUserState.login};
                    }
                    if (action.token) {
                        state.token = action.token;
                        state.tokenExpires = jwtDecode<JwtPayload>(action.token)?.exp ?? 0;
                    }
                    return;
                case CHANGE_USER:
                    state.profile = {...state.profile, ...action.props, changed: true};
                    return;
                case FETCH_USER_SIGNUP:
                    state.signUp = {...state.signUp, ...(action.props ?? {}), loading: action.status === FETCH_INIT};
                    if (action.status === FETCH_SUCCESS) {
                        state.profile = action.props;
                    }
                    return;
                case FETCH_LOCAL_LOGIN:
                    state.login.loading = action.status === FETCH_INIT;
                    state.loading = action.status === FETCH_INIT;
                    if (action.status === FETCH_FAILURE) {
                        state.loggedIn = false;
                        state.authType = '';
                    } else if (action.status === FETCH_SUCCESS) {
                        state.login = {...initialUserState().login};
                    }
                    return;
                case CLEAR_USER_ACCOUNT:
                    localStore.removeItem(STORE_USER_ACCOUNT);
                    state.userAccount = null;
                    state.access.selected = null;
                    return;
                case FETCH_CUSTOMER:
                    if (action.status === FETCH_INIT) {
                        state.currentCustomer = {...action.customer};
                    } else if (action.status === FETCH_SUCCESS) {
                        const {Company, ARDivisionNo, CustomerNo, CustomerName, ShipToCode} = action.customer;
                        localStore.setItem<BasicCustomer>(STORE_CUSTOMER, {
                            ...state.currentCustomer,
                            ARDivisionNo,
                            CustomerNo,
                            CustomerName,
                            ShipToCode
                        });
                        state.currentCustomer = {ARDivisionNo, CustomerNo, CustomerName, ShipToCode};
                        state.recentAccounts = buildRecentAccounts(state.recentAccounts, {
                            ARDivisionNo,
                            CustomerNo,
                            CustomerName
                        });
                    }
                    return;
                case FETCH_USER_CUSTOMERS:
                    state.customerList.loading = action.status === FETCH_INIT;
                    if (action.status === FETCH_SUCCESS) {
                        state.customerList.list = action.list;
                        state.customerList.loaded = true;
                    } else if (action.status === FETCH_FAILURE) {
                        state.customerList = {..._initialUserState.customerList}
                    }
                    return;
                case FETCH_REP_LIST:
                    state.repList.loading = action.status === FETCH_INIT;
                    if (action.status === FETCH_SUCCESS) {
                        state.repList.list = action.list;
                        state.repList.loaded = true;
                    } else if (action.status === FETCH_FAILURE) {
                        state.repList.list = [];
                        state.repList.loaded = false;
                    }
                    return;
                case RECEIVE_REP_LIST:
                    state.repList.list = action.list;
                    state.repList.loading = false;
                    state.repList.loaded = true;
                    return;
                case FETCH_REP_LIST_FAILURE:
                    state.repList.list = [];
                    state.repList.loading = false;
                    state.repList.loaded = false;
                    return;
                case UPDATE_SIGNUP:
                    state.signUp = {...state.signUp, ...(action.props ?? {})};
                    return;
                case UPDATE_LOGIN:
                    state.login = {...state.login, ...(action.props ?? {})};
                    return;
                case CHANGE_USER_PASSWORD:
                    state.passwordChange = {...state.passwordChange, ...(action.props ?? {})};
                    return;
            }
        })
})
export default userReducer;

