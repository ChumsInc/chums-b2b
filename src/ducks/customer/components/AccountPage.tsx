import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {loadCustomer, setReturnToPath} from '../actions';
import AccountBreadcrumbs from "./AccountBreadcrumbs";
import {
    selectCustomerAccount,
    selectCustomerLoadStatus,
    selectCustomerShipToCode,
    selectShipToByCode
} from "../selectors";
import {generatePath, Outlet, useNavigate, useParams} from "react-router";
import DocumentTitle from "@components/DocumentTitle";
import AccountTabs from "./AccountTabs";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {customerSlug, isSameCustomer, parseCustomerSlug} from "@utils/customer";
import ReturnToAlert from "./ReturnToAlert";
import {sendGtagEvent} from "@api/gtag";
import {selectCurrentUserAccount} from "@ducks/user/selectors";
import CustomerTitle from "@ducks/customer/components/CustomerTitle";

const AccountPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const customer = useSelector(selectCustomerAccount);
    const userAccount = useSelector(selectCurrentUserAccount);
    const params = useParams<{ customerSlug: string }>();
    const loadStatus = useSelector(selectCustomerLoadStatus);
    const shipToCode = useAppSelector(selectCustomerShipToCode);
    const shipTo = useAppSelector((state) => selectShipToByCode(state, shipToCode));

    useEffect(() => {
        return () => {
            dispatch(setReturnToPath(null));
        }
    }, []);

    useEffect(() => {
        if (customer) {
            sendGtagEvent('select_content', {
                content_type: 'customer',
                content_id: customerSlug(customer)!,
            })
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
