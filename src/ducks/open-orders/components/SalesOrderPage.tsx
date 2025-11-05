'use client';

import React, {useEffect} from 'react';
import {redirect, useMatch, useParams} from 'react-router';
import OrderDetail from "./OrderDetail";
import Alert from "@mui/material/Alert";
import DocumentTitle from "@/components/DocumentTitle";
import {
    selectCustomerAccount,
    selectCustomerLoaded,
    selectCustomerLoadStatus
} from "../../customer/currentCustomerSlice";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadSalesOrder} from "../actions";
import SalesOrderHeaderElement from "./SalesOrderHeaderElement";
import SalesOrderSkeleton from "./SalesOrderSkeleton";
import SalesOrderLoadingProgress from "./SalesOrderLoadingProgress";
import Typography from "@mui/material/Typography";
import {selectCurrentAccess} from "@/ducks/user/userAccessSlice";
import {selectSalesOrderHeader, selectSalesOrderStatus} from "@/ducks/open-orders/currentOrderSlice";

/**
 *
 * @TODO: Handle S/O not found, might require an update to orderStatus like cartStatus
 */

const SalesOrderPage = () => {
    const dispatch = useAppDispatch();
    const params = useParams<{ customerSlug: string; salesOrderNo: string }>();
    const match = useMatch('/account/:customerSlug/:orderType/:salesOrderNo');
    const userAccount = useAppSelector(selectCurrentAccess);
    const customer = useAppSelector(selectCustomerAccount);
    const salesOrderHeader = useAppSelector(selectSalesOrderHeader);
    const loading = useAppSelector(selectSalesOrderStatus);
    const customerLoaded = useAppSelector(selectCustomerLoaded);

    useEffect(() => {
        if (loading !== 'idle') {
            return;
        }
        if (!!params?.salesOrderNo && params?.salesOrderNo !== salesOrderHeader?.SalesOrderNo) {
            dispatch(loadSalesOrder(params.salesOrderNo))
        }
    }, [customer, userAccount, params, loading, salesOrderHeader]);


    if (!customer && customerLoaded) {
        redirect('/profile');
        return;
    }

    const documentTitle = `Sales Order #${match?.params?.salesOrderNo}`;
    if (!salesOrderHeader || !customer) {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <Typography variant="h3" component="h2">Sales Order #{match?.params?.salesOrderNo}</Typography>
                <div className="sales-order-page">
                    <SalesOrderSkeleton/>
                </div>
                <SalesOrderLoadingProgress />
            </div>
        )
    }

    if (salesOrderHeader.OrderStatus === 'X') {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <Typography variant="h3" component="h2">Cancelled Order #{salesOrderHeader.SalesOrderNo}</Typography>
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
                <Typography variant="h3" component="h2">Sales Order #{salesOrderHeader.SalesOrderNo}</Typography>
                <SalesOrderHeaderElement/>
                <SalesOrderLoadingProgress/>
                <OrderDetail salesOrderNo={match?.params?.salesOrderNo}/>
            </div>
        </div>
    )
}

export default SalesOrderPage;
