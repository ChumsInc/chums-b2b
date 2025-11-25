import type {SetLoggedInProps, UserProfileResponse} from "@/ducks/user/types";
import {getSignInProfile} from "@/utils/jwtHelper.ts";
import {auth} from "@/api/IntranetAuthService.ts";
import type {StoredProfile} from "@/types/user.ts";
import localStore from "@/utils/LocalStore.ts";
import type {RecentCustomer, UserCustomerAccess} from "chums-types/b2b";
import {STORE_AUTHTYPE, STORE_RECENT_ACCOUNTS, STORE_USER_ACCESS} from "@/constants/stores.ts";

export function signInWithGoogleHelper(response: UserProfileResponse, arg: string): UserProfileResponse {
    if (!response.user) {
        return response;
    }
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
    response.picture = profile?.imageUrl ?? null;
    auth.setProfile(storedProfile);
    response.recentCustomers = localStore.getItem<RecentCustomer[]>(STORE_RECENT_ACCOUNTS, []);
    return response;
}

export function setLoggedInHelper(arg: SetLoggedInProps): SetLoggedInProps {
    const accounts = getCustomerAccounts()
    return {
        ...arg,
        accessList: arg.accessList ?? accounts,
        access: arg.access ?? getCustomerAccess(accounts),
        authType: arg.authType ?? getStoredAuthType()
    }
}

function getCustomerAccess(accounts: UserCustomerAccess[]): UserCustomerAccess | null {
    return localStore.getItem<UserCustomerAccess | null>(
        STORE_USER_ACCESS, (accounts.length === 1 ? accounts[0] : null)
    )
}

function getStoredAuthType():string {
    return localStore.getItem<string | null>(STORE_AUTHTYPE, null) ?? ''
}

function getCustomerAccounts():UserCustomerAccess[] {
    return auth.getProfile()?.chums?.user?.accounts ?? [];
}
