import AccountBreadcrumbs from "./AccountBreadcrumbs";
import {selectCustomerAccount, selectCustomerLoadStatus,} from "@/ducks/customer/currentCustomerSlice";
import {Outlet} from "react-router";
import AccountTabs from "./AccountTabs";
import {useAppSelector} from "@/app/hooks";
import CustomerTitle from "@/components/customer/CustomerTitle";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice";
import {useTitle} from "@/components/app/TitleContext";
import {useEffect} from "react";

export default function AccountPage() {
    const customer = useAppSelector(selectCustomerAccount);
    const loadStatus = useAppSelector(selectCustomerLoadStatus);
    const shipTo = useAppSelector(selectCustomerShipTo);
    const {setPageTitle} = useTitle();

    useEffect(() => {
        if (customer) {
            setPageTitle({title: customer.CustomerName});
        }
    }, [customer, setPageTitle,]);

    return (
        <div>
            <AccountBreadcrumbs/>
            <CustomerTitle customer={customer} shipTo={shipTo} loading={loadStatus !== 'idle'}/>
            <AccountTabs/>
            <Outlet/>
        </div>
    );
};
