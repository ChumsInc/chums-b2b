/**
 * Created by steve on 3/1/2017.
 */

import React, {useEffect} from "react";
import {setUserAccess} from "../../user/actions";
import {PATH_PROFILE} from "@/constants/paths";
import {selectAccessList, selectAccessListLoading, selectCurrentAccess} from "../../user/selectors";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {redirect, useLocation, useParams} from "react-router";
import AccountList from "./AccountList";
import {setReturnToPath} from "../../customer/actions";

const AccountListContainer = () => {
    const dispatch = useAppDispatch();
    const params = useParams<'id'>();
    const access = useAppSelector(selectCurrentAccess);
    const accessList = useAppSelector(selectAccessList);
    const accessListLoading = useAppSelector(selectAccessListLoading);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.returnTo) {
            dispatch(setReturnToPath(location.state.returnTo));
        }
    }, []);


    useEffect(() => {
        if (accessListLoading) {
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
    }, [params, access, accessList, accessListLoading]);

    return (
        <AccountList/>
    );
}

export default AccountListContainer;
