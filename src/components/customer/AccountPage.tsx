import {useEffect} from 'react';
import {loadCustomer, setReturnToPath} from '@/ducks/customer/actions.ts';
import AccountBreadcrumbs from "./AccountBreadcrumbs.tsx";
import {selectCustomerAccount, selectCustomerLoadStatus,} from "@/ducks/customer/selectors.ts";
import {generatePath, Outlet, useNavigate, useParams} from "react-router";
import DocumentTitle from "@/components/DocumentTitle.tsx";
import AccountTabs from "./AccountTabs.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {customerSlug, isSameCustomer, parseCustomerSlug} from "@/utils/customer.ts";
import ReturnToAlert from "./ReturnToAlert.tsx";
import CustomerTitle from "@/components/customer/CustomerTitle.tsx";
import {ga4SelectCustomer} from "@/utils/ga4/generic.ts";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice.ts";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice.ts";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customer = useAppSelector(selectCustomerAccount);
    const userAccount = useAppSelector(selectCurrentAccess);
    const params = useParams<{ customerSlug: string }>();
    const loadStatus = useAppSelector(selectCustomerLoadStatus);
    const shipTo = useAppSelector(selectCustomerShipTo);

    useEffect(() => {
        return () => {
            dispatch(setReturnToPath(null));
        }
    }, []);

    useEffect(() => {
        if (customer) {
            ga4SelectCustomer(customerSlug(customer)!);
        }
    }, [customer]);

    useEffect(() => {
        const nextCustomer = parseCustomerSlug(params.customerSlug ?? '');
        if (!nextCustomer || !customerSlug(nextCustomer)) {
            console.log('nextCustomer', nextCustomer, customerSlug(nextCustomer));
            if (!userAccount?.id) {
                navigate(`/profile`);
                return;
            }
            navigate(generatePath('/profile/:id', {id: `${userAccount.id}`}));
            return;
        }

        if (isSameCustomer(customer, nextCustomer)) {
            return;
        }
        if (loadStatus === 'idle') {
            dispatch(loadCustomer(nextCustomer));
        }
    }, [params, customer, loadStatus, userAccount])

    return (
        <div>
            <DocumentTitle documentTitle={customer?.CustomerName ?? ''}/>
            <AccountBreadcrumbs/>
            <ReturnToAlert/>
            <CustomerTitle customer={customer} shipTo={shipTo} loading={loadStatus !== 'idle'}/>
            <AccountTabs/>
            <Outlet/>
        </div>
    );
};

export default AccountPage;
