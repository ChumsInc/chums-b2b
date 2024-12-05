import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {redirect} from 'react-router-dom';
import OrderDetail from "./OrderDetail";
import Alert from "@mui/material/Alert";
import DocumentTitle from "@components/DocumentTitle";
import {useMatch, useParams} from "react-router";
import {selectCustomerAccount, selectCustomerLoading} from "../../customer/selectors";
import {selectIsCart, selectSOLoading} from "../../sales-order/selectors";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {loadSalesOrder} from "../actions";
import SalesOrderHeaderElement from "./SalesOrderHeaderElement";
import SalesOrderSkeleton from "./SalesOrderSkeleton";
import {selectSalesOrder} from "../selectors";
import SalesOrderLoadingProgress from "./SalesOrderLoadingProgress";
import {selectCurrentUserAccount} from "@ducks/user/selectors";

const SalesOrderPage = () => {
    const dispatch = useAppDispatch();
    const userAccount = useSelector(selectCurrentUserAccount);
    const params = useParams<{ customerSlug: string; salesOrderNo: string }>();
    const match = useMatch('/account/:customerSlug/:orderType/:salesOrderNo');
    const customer = useSelector(selectCustomerAccount);
    const salesOrderHeader = useAppSelector((state) => selectSalesOrder(state, params?.salesOrderNo ?? ''));
    const loading = useSelector(selectSOLoading);
    const customerLoading = useSelector(selectCustomerLoading);

    useEffect(() => {
        if (loading || customerLoading) {
            return;
        }
        if (!!params?.salesOrderNo && params?.salesOrderNo !== salesOrderHeader?.SalesOrderNo) {
            dispatch(loadSalesOrder(params.salesOrderNo))
        }
    }, [customer, userAccount, params, loading, salesOrderHeader]);


    if (!customer && !customerLoading) {
        redirect('/profile');
        return;
    }

    const documentTitle = `Sales Order #${match?.params?.salesOrderNo}`;
    if (!salesOrderHeader || !customer) {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <div className="sales-order-page">
                    <SalesOrderSkeleton/>
                </div>
                <SalesOrderLoadingProgress salesOrderNo={match?.params?.salesOrderNo}/>
            </div>
        )
    }

    if (salesOrderHeader.OrderStatus === 'X') {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <h2>Cancelled Order #{salesOrderHeader.SalesOrderNo}</h2>
                <div className="sales-order-page">
                    <SalesOrderSkeleton/>
                </div>
                <Alert severity="error" title="Note:">
                    This order has been cancelled. Please contact Customer Service if you have any questions.
                </Alert>
            </div>
        )

    }

    return (
        <div>
            <DocumentTitle documentTitle={documentTitle}/>
            <div className="sales-order-page">
                <h2>Sales Order #{salesOrderHeader.SalesOrderNo}</h2>
                <SalesOrderHeaderElement/>
                <SalesOrderLoadingProgress salesOrderNo={match?.params?.salesOrderNo}/>
                <OrderDetail salesOrderNo={match?.params?.salesOrderNo}/>
            </div>
        </div>
    )
}

export default SalesOrderPage;
