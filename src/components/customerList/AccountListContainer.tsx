'use client';

import {useEffect} from 'react';
import {setUserAccess} from '@/ducks/user/actions';
import {PATH_PROFILE} from "@/constants/paths";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {redirect, useLocation, useParams} from "react-router";
import AccountList from "./AccountList";
import {setReturnToPath} from "@/ducks/customer/actions";
import {selectAccessList, selectAccessStatus, selectCurrentAccess} from "@/ducks/user/userAccessSlice";

const AccountListContainer = () => {
    const dispatch = useAppDispatch();
    const params = useParams<'id'>();
    const access = useAppSelector(selectCurrentAccess);
    const accessList = useAppSelector(selectAccessList);
    const accessStatus = useAppSelector(selectAccessStatus);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.returnTo) {
            dispatch(setReturnToPath(location.state.returnTo));
        }
    }, []);


    useEffect(() => {
        if (accessStatus !== 'idle') {
            return;
        }
        const id = Number(params.id ?? 0);
        const [nextAccess] = accessList.filter(ca => ca.id === id);
        if (!nextAccess) {
            redirect(PATH_PROFILE);
            return;
        }
        if (nextAccess.id !== access?.id) {
            dispatch(setUserAccess(nextAccess));
        }
    }, [params, access, accessList, accessStatus]);

    return (
        <AccountList/>
    );
}

export default AccountListContainer;
