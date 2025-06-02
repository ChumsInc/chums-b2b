import React from "react";
import {PATH_PROFILE, PATH_PROFILE_ACCOUNT} from "@/constants/paths";
import Breadcrumb from "@/components/Breadcrumb";
import {selectCurrentUserAccount, selectUserAccountsCount} from "../../user/selectors";
import {selectCustomerAccount} from "../selectors";
import {generatePath, useLocation} from "react-router";
import {BreadcrumbPath} from "@/types/breadcrumbs";
import {repAccessCode} from "../../user/utils";
import {useAppSelector} from "@/app/configureStore";

const AccountBreadcrumbs = () => {
    const countUserAccounts = useAppSelector(selectUserAccountsCount);
    const userAccount = useAppSelector(selectCurrentUserAccount);
    const customerAccount = useAppSelector(selectCustomerAccount);
    const location = useLocation();

    if (countUserAccounts < 2) {
        return null;
    }

    const paths: BreadcrumbPath[] = [
        {title: 'Profile', pathname: PATH_PROFILE},
    ];
    if (userAccount?.isRepAccount) {
        paths.push(
            {title: repAccessCode(userAccount), pathname: PATH_PROFILE},
            {
                title: 'Account List',
                pathname: generatePath(PATH_PROFILE_ACCOUNT, {id: `${userAccount?.id ?? 0}`})
            });
    } else if (customerAccount) {
        paths.push({
            title: `${customerAccount.ARDivisionNo}-${customerAccount.CustomerNo}`,
            pathname: location.pathname
        })
    }


    return (
        <Breadcrumb paths={paths}/>
    )
}

export default AccountBreadcrumbs;
