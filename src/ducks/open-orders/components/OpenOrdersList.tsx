import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {useSelector} from "react-redux";
import {
    selectOpenOrdersCustomerKey,
    selectOpenOrdersFilter,
    selectOpenOrdersList,
    selectOpenOrdersLoaded,
    selectOpenOrdersLoading
} from "../selectors";
import {selectCurrentCustomer} from "../../user/selectors";
import OrdersList from "./OrdersList";
import OrderLink from "../../../components/OrderLink";
import {DateString} from "@components/DateString";
import numeral from "numeral";
import {SortableTableField} from "@src/common-components/DataTable";
import Decimal from "decimal.js";
import {SalesOrderHeader} from "b2b-types";
import {loadOpenOrders, setOpenOrdersFilter} from "../actions";
import OrderFilter from "./OrderFilter";
import LinearProgress from "@mui/material/LinearProgress";
import NoOpenOrdersAlert from "./NoOpenOrdersAlert";
import Button from "@mui/material/Button"
import {selectCustomerShipToCode} from "../../customer/selectors";


const openOrderFields: SortableTableField<SalesOrderHeader>[] = [
    {
        field: 'SalesOrderNo', title: 'Order #',
        render: (so) => <OrderLink salesOrderNo={so.SalesOrderNo} orderType="open"/>,
        sortable: true,
    },
    {field: 'ShipToCode', title: 'Ship To Code', sortable: true},
    {field: 'ShipToName', title: 'Ship To', sortable: true},
    {
        field: 'ShipToCity', title: 'Location', sortable: true,
        render: (so) => `${so.ShipToCity}, ${so.ShipToState} ${so.ShipToZipCode}`
    },
    {field: 'CustomerPONo', title: 'PO #', sortable: true},
    {
        field: 'OrderDate', title: 'Ordered', sortable: true,
        render: (so) => <DateString date={so.OrderDate}/>
    },
    {
        field: 'ShipExpireDate', title: ' Req. Ship Date', sortable: true,
        render: (so) => <DateString date={so.ShipExpireDate}/>
    },
    {
        field: 'NonTaxableAmt',
        title: 'Total',
        render: (so) => numeral(new Decimal(so.NonTaxableAmt).add(so.TaxableAmt)).format('0,0.00'),
        align: 'right',
        sortable: true,
    }
];

const OpenOrdersList = () => {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectOpenOrdersCustomerKey);
    const currentCustomer = useSelector(selectCurrentCustomer);
    const shipToCode = useAppSelector(selectCustomerShipToCode);
    const orders = useSelector(selectOpenOrdersList);
    const loading = useSelector(selectOpenOrdersLoading);
    const loaded = useSelector(selectOpenOrdersLoaded);
    const filter = useSelector(selectOpenOrdersFilter);
    const [list,  setList] = useState(orders.filter(so => !shipToCode || so.ShipToCode === shipToCode));

    useEffect(() => {
        if (loading === 'idle' && !loaded && !!customerKey) {
            dispatch(loadOpenOrders(customerKey));
        }
    }, [loading, loaded, customerKey]);

    useEffect(() => {
        setList(orders.filter(so => !shipToCode || so.ShipToCode === shipToCode));
    }, [orders, shipToCode]);

    const reloadHandler = () => {
        if (customerKey) {
            dispatch(loadOpenOrders(customerKey));
        }
    }

    if (!currentCustomer || !currentCustomer.CustomerNo) {
        return null;
    }

    return (
        <>
            <OrderFilter value={filter} onChange={(ev) => dispatch(setOpenOrdersFilter(ev.target.value))} maxLength={30}>
                <Button type="button" variant="text" onClick={reloadHandler}>
                    Reload
                </Button>
            </OrderFilter>
            {loading === 'pending' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
            <OrdersList list={list} fields={openOrderFields}/>
            <NoOpenOrdersAlert/>
        </>
    )
}

export default OpenOrdersList;
