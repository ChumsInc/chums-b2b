import type {UserCustomerAccess, UserProfile} from "chums-types/b2b";
import {createContext} from "react";

export interface ProfileContextState {
    profile: UserProfile | null;
    currentAccess: UserCustomerAccess | null;
    list: UserCustomerAccess[];
    setCurrentAccess: (id: number | null) => void;
    reloadProfile: () => void;
    reloadAccountList: () => void;
}

export const ProfileContext = createContext<ProfileContextState | null>(null);
