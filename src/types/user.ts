import type {CustomerAddress, UserCustomerAccess, UserProfile} from "b2b-types";

export interface LocalAuth {
    email: string;
    password: string;
}


export interface ExtendedUserProfile extends UserProfile {
    accounts?: UserCustomerAccess[];
    roles?: string[]
}

export interface GoogleProfile {
    email?: string;
    familyName?: string;
    givenName?: string;
    googleId?: string;
    imageUrl?: string;
    name?: string;
}

export interface StoredProfile extends GoogleProfile {
    chums?: {
        user?: ExtendedUserProfile
    },
}

export interface SignUpUser {
    email: string;
    name: string;
    hasAccount: boolean;
    account: string;
    accountName: string;
    telephone: string;
    address: CustomerAddress|null;
    agreeToPolicy: boolean;
}

export interface SignUpResponse {
    success: boolean;
    message: string;
}
