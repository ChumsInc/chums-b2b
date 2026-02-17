import {useEffect} from 'react';
import {loadCustomer, setReturnToPath} from '@/ducks/customer/actions';
import AccountBreadcrumbs from "./AccountBreadcrumbs";
import {selectCustomerAccount, selectCustomerLoadStatus,} from "@/ducks/customer/currentCustomerSlice";
import {generatePath, Outlet, useNavigate, useParams} from "react-router";
import AccountTabs from "./AccountTabs";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {customerSlug, isSameCustomer, parseCustomerSlug} from "@/utils/customer";
import ReturnToAlert from "./ReturnToAlert";
import CustomerTitle from "@/components/customer/CustomerTitle";
import {ga4SelectCustomer} from "@/utils/ga4/generic";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice";
import {useTitle} from "@/components/app/TitleContext";

export default function AccountPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customer = useAppSelector(selectCustomerAccount);
    const userAccount = useAppSelector(selectCurrentAccess);
    const params = useParams<{ customerSlug: string }>();
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
            ga4SelectCustomer(customerSlug(customer)!);
        }
    }, [customer]);

    useEffect(() => {
        const nextCustomer = parseCustomerSlug(params.customerSlug ?? '');

        if (isSameCustomer(customer, nextCustomer)) {
            return;
        }

        if (!nextCustomer || !customerSlug(nextCustomer)) {
            if (!userAccount?.id) {
                navigate(`/profile`);
                return;
            }
            navigate(generatePath('/profile/:id', {id: `${userAccount.id}`}));
            return;
        }

        if (loadStatus === 'idle') {
            dispatch(loadCustomer(nextCustomer));
        }
    }, [params, customer, loadStatus, userAccount])

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
