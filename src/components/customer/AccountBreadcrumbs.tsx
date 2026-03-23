import {PATH_PROFILE, PATH_PROFILE_ACCOUNT} from "@/constants/paths";
import Breadcrumb from "@/components/common/Breadcrumb.tsx";
import {generatePath, useLocation} from "react-router";
import type {BreadcrumbPath} from "@/types/breadcrumbs";
import {repAccessCode} from "@/ducks/user/utils";
import {useAppSelector} from "@/app/hooks";
import {selectUserAccessCount} from "@/ducks/user/userAccessSlice";
import {useProfile} from "@/hooks/profile-provider/use-profile-hook.ts";
import useCustomer from "@/hooks/customer/useCustomer.ts";

const minBreadcrumbAccounts = 2;

const AccountBreadcrumbs = () => {
    const countUserAccounts = useAppSelector(selectUserAccessCount);
    const {currentAccess} = useProfile();
    const {customerKey} = useCustomer()
    const location = useLocation();

    if (countUserAccounts < minBreadcrumbAccounts) {
        return null;
    }

    const paths: BreadcrumbPath[] = [
        {title: 'Profile', pathname: PATH_PROFILE},
    ];
    if (currentAccess?.isRepAccount) {
        paths.push(
            {
                title: repAccessCode(currentAccess),
                pathname: generatePath(PATH_PROFILE_ACCOUNT, {id: `${currentAccess?.id ?? 0}`})
            },
            {
                title: 'Account List',
                pathname: generatePath(PATH_PROFILE_ACCOUNT, {id: `${currentAccess?.id ?? 0}`})
            });
        if (customerKey) {
            paths.push({
                title: customerKey,
                pathname: location.pathname
            })
        }
    } else if (customerKey) {
        paths.push({
            title: customerKey,
            pathname: location.pathname
        })
    }


    return (
        <Breadcrumb paths={paths}/>
    )
}

export default AccountBreadcrumbs;
