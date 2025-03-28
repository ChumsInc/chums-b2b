import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {redirect, useMatch, useParams} from 'react-router';
import OrderDetail from "./OrderDetail";
import Alert from "@mui/material/Alert";
import DocumentTitle from "@/components/DocumentTitle";
import {selectCustomerAccount, selectCustomerLoading} from "../../customer/selectors";
import {selectSOLoading} from "../../sales-order/selectors";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadSalesOrder} from "../actions";
import SalesOrderHeaderElement from "./SalesOrderHeaderElement";
import SalesOrderSkeleton from "./SalesOrderSkeleton";
import {selectSalesOrder} from "../selectors";
import SalesOrderLoadingProgress from "./SalesOrderLoadingProgress";
import {selectCurrentUserAccount} from "@/ducks/user/selectors";
import Typography from "@mui/material/Typography";

/**
 *
 * @TODO: Handle S/O not found, might require an update to orderStatus like cartStatus
 */

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
                <Typography variant="h3" component="h2">Sales Order #{match?.params?.salesOrderNo}</Typography>
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
                <SalesOrderLoadingProgress salesOrderNo={match?.params?.salesOrderNo}/>
                <OrderDetail salesOrderNo={match?.params?.salesOrderNo}/>
            </div>
        </div>
    )
}

export default SalesOrderPage;
