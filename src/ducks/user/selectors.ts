import {createSelector} from "@reduxjs/toolkit";
import {type RootState} from "@/app/configureStore";
import {isUserProfile} from "./utils";

export const selectUserProfile = (state: RootState) => state.user.profile;
export const selectUserType = (state: RootState) => state.user.userType;
export const selectProfilePicture = (state: RootState) => state.user.picture;

export const selectLoggedIn = (state: RootState) => state.user.loggedIn ?? false;
export const selectLoggingIn = (state: RootState) => state.user.actionStatus === 'logging-in';

export const selectAuthType = (state: RootState) => state.user.authType;

export const selectUserActionStatus = (state: RootState) => state.user.actionStatus;
export const selectUserLoading = (state: RootState) => state.user.actionStatus !== 'idle';
export const selectResettingPassword = (state: RootState) => state.user.actionStatus === 'resetting-password';

export const selectIsEmployee = (state: RootState) => state.user.roles.filter(role => role === 'employee').length === 1;
export const selectIsRep = (state: RootState) => state.user.roles.filter(role => role === 'rep').length === 1;
export const selectCanEdit = createSelector(
    [selectIsEmployee, selectIsRep],
    (isEmployee, isRep) => {
        return (isEmployee || isRep);
    }
)


export const selectLoginExpiry = (state: RootState) => state.user.tokenExpires ?? 0;

export const selectCanViewAvailable = createSelector(
    [selectUserProfile],
    (profile) => {
        return isUserProfile(profile) && profile.accountType === 1;
    }
)
