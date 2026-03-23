import AccountBreadcrumbs from "./AccountBreadcrumbs";
import {Outlet} from "react-router";
import AccountTabs from "./AccountTabs";
import CustomerTitle from "@/components/customer/CustomerTitle";
import {useTitle} from "@/components/app/TitleContext";
import {useEffect} from "react";
import useCustomer from "@/hooks/customer/useCustomer.ts";

export default function AccountPage() {
    const {customer, status, shipTo} = useCustomer();
    const {setPageTitle} = useTitle();

    useEffect(() => {
        if (customer) {
            setPageTitle({title: customer.CustomerName});
        }
    }, [customer, setPageTitle,]);

    return (
        <div>
            <AccountBreadcrumbs/>
            <CustomerTitle customer={customer} shipTo={shipTo} loading={status !== 'idle'}/>
            <AccountTabs/>
            <Outlet/>
        </div>
    );
};
