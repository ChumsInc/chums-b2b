import React, {useEffect} from 'react';
import {redirect, useMatch} from 'react-router';
import OrderDetail from "./OrderDetail";
import DocumentTitle from "../../../components/DocumentTitle";
import {selectCustomerAccount, selectCustomerLoading} from "../../customer/selectors";
import {selectSalesOrderHeader, selectSOLoading} from "../../sales-order/selectors";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadSalesOrder} from "../actions";
import SalesOrderHeaderElement from "./SalesOrderHeaderElement";
import SalesOrderSkeleton from "./SalesOrderSkeleton";
import SalesOrderLoadingProgress from "./SalesOrderLoadingProgress";

const ClosedSalesOrderPage = () => {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/:parentType/:salesOrderNo');
    const customer = useAppSelector(selectCustomerAccount);
    const salesOrderHeader = useAppSelector(selectSalesOrderHeader);
    const loading = useAppSelector(selectSOLoading);
    const customerLoading = useAppSelector(selectCustomerLoading);

    useEffect(() => {
        if (customer && !!customer.CustomerNo) {
            if (!loading && !!match?.params?.salesOrderNo && (match?.params?.salesOrderNo !== salesOrderHeader?.SalesOrderNo)) {
                dispatch(loadSalesOrder(match.params.salesOrderNo))
            }
        }
    }, [customer, match, loading, salesOrderHeader]);


    if (!customer && !customerLoading) {
        redirect('/profile');
        return;
    }

    const documentTitle = `'Completed Order Info #${match?.params?.salesOrderNo}`;
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

export default ClosedSalesOrderPage;
