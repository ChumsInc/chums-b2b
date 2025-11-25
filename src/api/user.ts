import type {Salesperson, UserProfile} from 'chums-types/b2b'
import type {
    ChangePasswordProps,
    ChangePasswordResponse,
    FunkyUserProfileResponse,
    SetNewPasswordProps,
    UserProfileResponse
} from "@/ducks/user/types";
import {allowErrorResponseHandler, fetchJSON} from "./fetch";
import type {LocalAuth, SignUpResponse, SignUpUser, StoredProfile} from "@/types/user";
import {auth} from "./IntranetAuthService";
import {getSignInProfile, isTokenExpired} from "@/utils/jwtHelper";
import localStore from "../utils/LocalStore";
import {STORE_AUTHTYPE} from "@/constants/stores";
import {AUTH_GOOGLE} from "@/constants/app";
import {isErrorResponse, isUserRole} from "@/utils/typeguards";
import {jwtDecode} from 'jwt-decode';
import type {LoadProfileProps, SignUpProfile} from "@/ducks/sign-up/types";
import type {APIErrorResponse} from "@/types/generic";
import {configGtag} from "@/utils/ga4/api";
import {ga4Login, ga4SignUp} from "@/utils/ga4/generic";
import debug from "@/utils/debug.ts";


export async function postLocalLogin(arg: LocalAuth): Promise<string | APIErrorResponse> {
    try {
        const body = JSON.stringify(arg);
        const url = '/api/user/v2/b2b/login/local.json';
        const res = await fetchJSON<{ token: string }>(url,
            {method: 'POST', body, credentials: 'omit',},
            allowErrorResponseHandler
        );
        if (isErrorResponse(res)) {
            return res;
        }
        if (!res) {
            return Promise.reject(new Error('Login Error: unknown error'));
        }
        ga4Login('credentials')
        return res.token;
    } catch (err) {
        if (err instanceof Error) {
            debug("postLocalLogin()", err.message);
            return Promise.reject(err);
        }
        debug("postLocalLogin()", err);
        return Promise.reject(new Error('Error in postLocalLogin()'));
    }
}

export async function postLocalReauth(): Promise<string|null> {
    try {
        const url = '/api/user/v2/b2b/auth/renew.json';
        const res = await fetchJSON<{ token: string }>(url, {method: 'POST'});
        return res?.token ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postLocalReauth()", err.message);
            return Promise.reject(err);
        }
        debug("postLocalReauth()", err);
        return Promise.reject(new Error('Error in postLocalReauth()'));
    }
}

export async function fetchUserProfile(): Promise<UserProfileResponse> {
    try {
        const url = '/api/user/v2/b2b/profile.json';
        const response = await fetchJSON<UserProfileResponse>(url, {cache: 'no-cache'});
        if (!response) {
            return Promise.reject(new Error('Error loading user profile'));
        }
        response.reps = [];
        if (response.user?.accountType === 1) {
            response.reps = await fetchRepList();
        }
        // eslint-disable-next-line camelcase
        configGtag({user_id: `${response?.user?.id ?? 0}`})
        return response as UserProfileResponse;
    } catch (err) {
        if (err instanceof Error) {
            debug("fetchUserProfile()", err.message);
            return Promise.reject(err);
        }
        debug("fetchUserProfile()", err);
        return Promise.reject(new Error('Error in fetchUserProfile()'));
    }
}

export async function postUserProfile(arg: Pick<UserProfile, 'name'>): Promise<UserProfileResponse> {
    try {
        const url = '/api/user/v2/b2b/profile.json';
        const body = JSON.stringify(arg);
        const response = await fetchJSON<FunkyUserProfileResponse>(url, {method: 'PUT', body});
        if (!response) {
            return Promise.reject(new Error('Unknown error when saving user profile.'));
        }
        response.reps = [];
        response.roles = response.roles?.map(role => isUserRole(role) ? role.role : role);
        if (response.user?.accountType === 1) {
            response.reps = await fetchRepList();
        }
        if (response.token) {
            try {
                const decoded = jwtDecode(response.token);
                response.expires = decoded.exp;
            } catch (err: unknown) {
                //do nothing
            }
        }
        return response as UserProfileResponse;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postUserProfile()", err.message);
            return Promise.reject(err);
        }
        debug("postUserProfile()", err);
        return Promise.reject(new Error('Error in postUserProfile()'));
    }
}

export async function fetchRepList(): Promise<Salesperson[]> {
    try {
        const url = '/api/sales/b2b/salesperson/list.json';
        const response = await fetchJSON<{ list: Salesperson[] }>(url, {cache: 'no-cache'});
        return (response?.list ?? []).filter(rep => !!rep.active);
    } catch (err) {
        if (err instanceof Error) {
            debug("fetchRepList()", err.message);
            return Promise.reject(err);
        }
        debug("fetchRepList()", err);
        return Promise.reject(new Error('Error in fetchRepList()'));
    }
}


export async function fetchGoogleLogin(token: string): Promise<UserProfileResponse> {
    try {
        if (!isTokenExpired(token)) {
            auth.setToken(token);
        }
        const body = JSON.stringify({token});
        const url = '/api/user/v2/b2b/login/google.json';
        const response = await fetchJSON<UserProfileResponse>(url, {
            method: 'POST',
            body,
            credentials: 'omit'
        });
        if (!response) {
            return Promise.reject(new Error('Unable to load Google login'));
        }
        response.reps = [];
        if (response.user?.accountType === 1) {
            response.reps = await fetchRepList();
        }
        if (response.token) {
            try {
                const decoded = jwtDecode(response.token);
                response.expires = decoded.exp;
            } catch (err: unknown) {
                // do nothing
            }
        }
        if (response.user) {
            const profile = getSignInProfile(token);
            const {user, roles, accounts} = response;
            const storedProfile: StoredProfile = {
                ...profile,
                chums: {
                    user: {
                        ...user,
                        roles,
                        accounts
                    }
                }
            }
            ga4Login('google');
            auth.setProfile(storedProfile);
            localStore.setItem<string>(STORE_AUTHTYPE, AUTH_GOOGLE);
        }
        return response;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchGoogleLogin()", err.message);
            return Promise.reject(err);
        }
        debug("fetchGoogleLogin()", err);
        return Promise.reject(new Error('Error in fetchGoogleLogin()'));
    }
}

export async function postResetPassword(arg: string): Promise<boolean> {
    try {
        const body = JSON.stringify({email: arg});
        const url = '/api/user/v2/b2b/login/reset-password.json';
        const response = await fetchJSON<{ success: boolean }>(url,
            {method: 'POST', body, credentials: 'omit'}
        );
        return response?.success ?? false;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postResetPassword()", err.message);
            return Promise.reject(err);
        }
        debug("postResetPassword()", err);
        return Promise.reject(new Error('Error in postResetPassword()'));
    }
}

export async function fetchSignUpProfile(arg: LoadProfileProps): Promise<SignUpProfile | APIErrorResponse | null> {
    try {
        const url = '/api/user/v2/b2b/signup/:hash/:key.json'
            .replace(':hash', encodeURIComponent(arg.hash))
            .replace(':key', encodeURIComponent(arg.key));
        const res = await fetchJSON<{
            user: SignUpProfile
        } | APIErrorResponse>(url, {cache: 'no-cache'}, allowErrorResponseHandler);
        if (isErrorResponse(res)) {
            return res;
        }
        // eslint-disable-next-line camelcase
        configGtag({user_id: `${res?.user?.id ?? 0}`})
        return res?.user ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("fetchSignUpProfile()", err.message);
            return Promise.reject(err);
        }
        debug("fetchSignUpProfile()", err);
        return Promise.reject(new Error('Error in fetchSignUpProfile()'));
    }
}

export async function postSignUpUser(arg: SignUpUser): Promise<SignUpResponse | null> {
    try {
        const email = arg.email;
        const url = '/api/user/v2/b2b/signup.json'
            .replace(':email', encodeURIComponent(email));
        const body = JSON.stringify(arg);
        const res = await fetchJSON<SignUpResponse>(url, {method: 'POST', body});
        ga4SignUp();
        return res;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postSignUpUser()", err.message);
            return Promise.reject(err);
        }
        debug("postSignUpUser()", err);
        return Promise.reject(new Error('Error in postSignUpUser()'));
    }
}

export async function postPasswordChange(arg: ChangePasswordProps): Promise<ChangePasswordResponse|null> {
    try {
        const url = '/api/user/v2/b2b/password.json';
        const body = JSON.stringify(arg);
        return await fetchJSON<ChangePasswordResponse>(url, {
            method: 'POST',
            body,
        }, allowErrorResponseHandler);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postPasswordChange()", err.message);
            return Promise.reject(err);
        }
        debug("postPasswordChange()", err);
        return Promise.reject(new Error('Error in postPasswordChange()'));
    }
}

export async function postNewPassword(arg: SetNewPasswordProps): Promise<ChangePasswordResponse | null> {
    try {
        const url = `/api/user/v2/b2b/signup/:hash/:key.json`
            .replace(':hash', encodeURIComponent(arg.hash))
            .replace(':key', encodeURIComponent(arg.key));
        const body = JSON.stringify({newPassword: arg.newPassword});
        const res = await fetchJSON<ChangePasswordResponse>(url, {method: 'POST', body,}, allowErrorResponseHandler);
        return res ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postNewPassword()", err.message);
            return Promise.reject(err);
        }
        debug("postNewPassword()", err);
        return Promise.reject(new Error('Error in postNewPassword()'));
    }
}

// eslint-disable-next-line consistent-return
export async function postLogout(): Promise<void> {
    try {
        const url = '/api/user/v2/b2b/logout.json';
        await fetchJSON(url, {method: 'POST'}, allowErrorResponseHandler);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("postLogout()", err.message);
            return Promise.reject(err);
        }
        debug("postLogout()", err);
        return Promise.reject(new Error('Error in postLogout()'));
    }

}
