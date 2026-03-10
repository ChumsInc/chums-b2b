import {type ReactNode, useCallback, useEffect, useMemo} from "react";
import {ProfileContext, type ProfileContextState} from "@/components/user/profile-provider/ProfileContext.tsx";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectAccessList, selectCurrentAccess, setUserAccess} from "@/ducks/user/userAccessSlice.ts";
import {loadProfile} from "@/ducks/user/actions.ts";
import {selectLoggedIn, selectUserProfile} from "@/ducks/user/userProfileSlice.ts";
import {loadCustomerList} from "@/ducks/customers/actions.ts";
import {useParams} from "react-router";
import localStore from "@/utils/LocalStore.ts";
import type {UserCustomerAccess} from "chums-types/b2b";
import {STORE_USER_ACCESS} from "@/constants/stores.ts";
import {loadCustomer} from "@/ducks/customer/actions.ts";
import {canStorePreferences} from "@/ducks/cookie-consent/utils.ts";
import LocalStore from "@/utils/LocalStore.ts";


export interface ProfileProviderProps {
    children: ReactNode;
}

export default function ProfileProvider({children}: ProfileProviderProps) {
    const dispatch = useAppDispatch();
    const profile = useAppSelector(selectUserProfile);
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const list = useAppSelector(selectAccessList);
    const currentAccess = useAppSelector(selectCurrentAccess);
    const params = useParams<'accessId'>();

    const setCurrentAccess = useCallback((id: number|null) => {
        if (isLoggedIn && id !== currentAccess?.id) {
            const next = list.filter(acc => acc.isRepAccount).find(a => a.id === id) ?? null;
            localStore.setItem<UserCustomerAccess | null>(STORE_USER_ACCESS, next);
            dispatch(setUserAccess(next));
            if (next?.isRepAccount) {
                dispatch(loadCustomerList(next));
            } else {
                loadCustomer(next);
            }
        }
    }, [dispatch, isLoggedIn, list, currentAccess]);

    useEffect(() => {
        if (canStorePreferences()) {
            const access = LocalStore.getItem<UserCustomerAccess|null>(STORE_USER_ACCESS, null);
            setCurrentAccess(access?.id ?? null);
            dispatch(loadCustomerList(access));
        }
    }, [dispatch, setCurrentAccess]);

    useEffect(() => {
        if (params.accessId) {
            setCurrentAccess(params.accessId ? +params.accessId : null);
        }
    }, [params, setCurrentAccess])

    const reloadProfile = useCallback(() => {
        if (isLoggedIn) {
            dispatch(loadProfile());
        }
    }, [isLoggedIn, dispatch])

    const reloadAccountList = useCallback(() => {
        if (isLoggedIn && currentAccess) {
            dispatch(loadCustomerList(currentAccess));
        }
    }, [isLoggedIn, currentAccess, dispatch])

    const value = useMemo(() => {
        if (!isLoggedIn) {
            return null;
        }
        return {
            profile,
            currentAccess,
            list,
            setCurrentAccess,
            reloadProfile,
            reloadAccountList,
        } as ProfileContextState
    }, [list, currentAccess, setCurrentAccess, reloadProfile, reloadAccountList, profile, isLoggedIn]);

    return (
        <ProfileContext value={value}>
            {children}
        </ProfileContext>
    )
}
