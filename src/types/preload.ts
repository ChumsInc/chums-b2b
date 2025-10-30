import type {UserCustomerAccess, UserProfile} from "b2b-types";


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
