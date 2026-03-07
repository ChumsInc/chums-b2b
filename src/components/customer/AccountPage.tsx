import {useEffect} from 'react';
import {setReturnToPath} from '@/ducks/customer/actions';
import AccountBreadcrumbs from "./AccountBreadcrumbs";
import {selectCustomerAccount, selectCustomerLoadStatus,} from "@/ducks/customer/currentCustomerSlice";
import {Outlet} from "react-router";
import AccountTabs from "./AccountTabs";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import ReturnToAlert from "./ReturnToAlert";
import CustomerTitle from "@/components/customer/CustomerTitle";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice";
import {useTitle} from "@/components/app/TitleContext";

export default function AccountPage() {
    const dispatch = useAppDispatch();
    const customer = useAppSelector(selectCustomerAccount);
    const loadStatus = useAppSelector(selectCustomerLoadStatus);
    const shipTo = useAppSelector(selectCustomerShipTo);
    const {setPageTitle} = useTitle()

    useEffect(() => {
        return () => {
            dispatch(setReturnToPath(null));
        }
    }, []);

    useEffect(() => {
        if (customer) {
            setPageTitle({title: customer.CustomerName});
        }
    }, [customer]);


    return (
        <div>
            <AccountBreadcrumbs/>
            <ReturnToAlert/>
            <CustomerTitle customer={customer} shipTo={shipTo} loading={loadStatus !== 'idle'}/>
            <AccountTabs/>
            <Outlet/>
        </div>
    );
};
