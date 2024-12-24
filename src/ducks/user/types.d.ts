import {Salesperson, UserCustomerAccess, UserProfile, UserRole} from "b2b-types";



export interface UserSignupState {
    email: string;
    authKey: string; // not used?
    authHash: string;
    error: string | null;
    loading: boolean;
}

export interface UserPasswordState {
    // @TODO: migrate to PasswordForm internal state
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
    visible: boolean;
}


export interface SetLoggedInProps {
    loggedIn: boolean;
    authType?: string;
    token?: string;
    expires?: number;
}

export interface UserProfileResponse {
    user?: UserProfile;
    roles?: string[];
    accounts?: UserCustomerAccess[];
    reps?: Salesperson[];
    picture?: string | null;
    expires?: number;
    token?: string;
}

export interface FunkyUserProfileResponse extends UserProfileResponse {
    roles?: (string | UserRole)[];
}

export interface ChangePasswordProps {
    oldPassword: string;
    newPassword: string;
}

export interface ChangePasswordResponse {
    error?: string;
    success?: boolean;
    token?: string;
}

export interface SetNewPasswordProps {
    key: string;
    hash: string;
    newPassword: string;
}

export type SignUpProfile = Pick<UserProfile, 'id' | 'email' | 'name' | 'accountType'>;

export type UserType = 'EMPLOYEE' | 'REP' | 'CUSTOMER' | 'BUYER';
