import {auth} from '@/api/IntranetAuthService';
import LocalStore from "../../utils/LocalStore";
import {STORE_AUTHTYPE, STORE_AVATAR} from "@/constants/stores";
import {jwtDecode, type JwtPayload} from "jwt-decode";
import {createSelector, createSlice} from "@reduxjs/toolkit";
import {
    changePassword,
    loadProfile,
    loginUser,
    logoutUser,
    resetPassword,
    saveUserProfile,
    setLoggedIn,
    setNewPassword,
    signInWithGoogle,
    updateLocalAuth
} from "./actions";
import {getUserType, is401Action, isUserProfile} from "./utils";
import type {UserType} from "./types";
import type {Editable, UserProfile} from "chums-types/b2b";
import type {LoadStatus} from "@/types/generic";


export interface UserState {
    token: string | null;
    tokenExpires: number;
    profile: (UserProfile & Editable) | null;
    userType: UserType | null;
    picture: string | null;
    roles: string[];
    loggedIn: boolean;
    authType: string;
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
    const authType = isLoggedIn ? LocalStore.getItem<string | null>(STORE_AUTHTYPE, null) : null;

    return {
        token: existingToken ?? null,
        tokenExpires: existingTokenExpires,
        profile: profile?.chums?.user ?? null,
        userType: getUserType(profile?.chums?.user ?? null),
        picture: avatar ?? profile?.imageUrl ?? null,
        roles: profile?.chums?.user?.roles ?? [],
        loggedIn: isLoggedIn,
        authType: authType ?? '',
        actionStatus: 'idle',
    }
}

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: (initialUserState()),
    reducers: {},
    extraReducers: builder => {
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
                    state.roles = _initialUserState.roles;
                    state.authType = _initialUserState.authType;
                }
                state.loggedIn = action.payload.loggedIn;
                state.token = action.payload.token ?? null;
                state.tokenExpires = action.payload.expires ?? 0;
                if (!action.payload?.loggedIn) {
                    state.token = null;
                    state.tokenExpires = 0;
                    state.profile = null;
                    state.userType = null;
                    state.roles = [];
                    state.authType = '';
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
            })
            .addCase(loadProfile.rejected, (state) => {
                state.actionStatus = 'idle';
            })
            .addCase(signInWithGoogle.pending, (state) => {
                state.actionStatus = 'pending';
            })
            .addCase(signInWithGoogle.fulfilled, (state, action) => {
                state.actionStatus = 'idle';
                state.token = action.payload.token ?? null;
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
            .addMatcher(is401Action, (state) => {
                state.loggedIn = false;
                state.token = null;
                state.tokenExpires = 0;
            })
    },
    selectors: {
        selectUserProfile: (state) => state.profile,
        selectUserType: (state) => state.userType,
        selectProfilePicture: (state) => state.picture,
        selectLoggedIn: (state) => state.loggedIn,
        selectLoggingIn: (state) => state.actionStatus === 'logging-in',
        selectAuthType: (state) => state.authType,
        selectUserActionStatus: (state) => state.actionStatus,
        selectUserLoading: (state) => state.actionStatus !== 'idle',
        selectResettingPassword: (state) => state.actionStatus === 'resetting-password',
        selectRoles: (state) => state.roles,
        selectLoginExpiry: (state) => state.tokenExpires,
    }
})

export default userProfileSlice;

export const {
    selectRoles,
    selectLoggedIn,
    selectLoggingIn,
    selectResettingPassword,
    selectUserActionStatus,
    selectUserLoading,
    selectUserType,
    selectAuthType,
    selectUserProfile,
    selectProfilePicture,
    selectLoginExpiry
} = userProfileSlice.selectors;

export const selectIsEmployee = createSelector(
    [selectRoles],
    (roles) => roles.includes('employee')
)

export const selectIsRep = createSelector(
    [selectRoles],
    (roles) => roles.includes('rep')
)

export const selectCanEdit = createSelector(
    [selectIsEmployee, selectIsRep],
    (isEmployee, isRep) => isEmployee || isRep
)

export const selectCanViewAvailable = createSelector(
    [selectUserProfile],
    (profile) => isUserProfile(profile) && profile.accountType === 1
)
