import {type ChangeEvent, useEffect, useState} from 'react';
import numeral from "numeral";
import Decimal from "decimal.js";
import type {SalesOrderHeader} from "chums-types/b2b";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button"
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {
    selectOpenOrdersCustomerKey,
    selectOpenOrdersFilter,
    selectOpenOrdersList,
    selectOpenOrdersLoaded,
    selectOpenOrdersStatus, setOpenOrdersFilter
} from "@/ducks/open-orders/openOrdersSlice";
import OrdersList from "./OrdersList";
import OrderLink from "./OrderLink.tsx";
import DateString from "@/components/common/DateString.tsx";
import type {SortableTableField} from "@/components/common/DataTable";
import {loadOpenOrders} from "@/ducks/open-orders/actions";
import OrderFilter from "./OrderFilter";
import NoOpenOrdersAlert from "./NoOpenOrdersAlert";
import {selectCustomerShipToCode} from "@/ducks/customer/customerShipToAddressSlice";
import ShipToCustomerLink from "@/components/customerList/ShipToCustomerLink.tsx";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";


const openOrderFields: SortableTableField<SalesOrderHeader>[] = [
    {
        field: 'SalesOrderNo', title: 'Order #',
        render: (so) => <OrderLink salesOrderNo={so.SalesOrderNo} orderType="open"/>,
        sortable: true,
    },
    {field: 'ShipToCode', title: 'Ship To Code', sortable: true, render: (so) => <ShipToCustomerLink salesOrder={so}/>},
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
    const currentCustomer = useAppSelector(selectCustomerAccount);
    const shipToCode = useAppSelector(selectCustomerShipToCode);
    const orders = useAppSelector(selectOpenOrdersList);
    const status = useAppSelector(selectOpenOrdersStatus);
    const loaded = useAppSelector(selectOpenOrdersLoaded);
    const filter = useAppSelector(selectOpenOrdersFilter);
    const [list, setList] = useState(orders.filter(so => !shipToCode || so.ShipToCode === shipToCode));

    useEffect(() => {
        if (status === 'idle' && !loaded && !!customerKey) {
            dispatch(loadOpenOrders(customerKey));
        }
    }, [status, loaded, customerKey]);

    useEffect(() => {
        setList(orders.filter(so => !shipToCode || so.ShipToCode === shipToCode));
    }, [orders, shipToCode]);

    const reloadHandler = () => {
        if (customerKey) {
            dispatch(loadOpenOrders(customerKey));
        }
    }

    const onChangeOrderFilter = (ev:ChangeEvent<HTMLInputElement>) => {
        dispatch(setOpenOrdersFilter(ev.target.value));
    }

    if (!currentCustomer || !currentCustomer.CustomerNo) {
        return null;
    }

    return (
        <>
            <OrderFilter value={filter} onChange={onChangeOrderFilter} maxLength={30}>
                <Button type="button" variant="text" onClick={reloadHandler}>
                    Reload
                </Button>
            </OrderFilter>
            {status === 'loading' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
            <OrdersList list={list} fields={openOrderFields}/>
            <NoOpenOrdersAlert/>
        </>
    )
}

export default OpenOrdersList;
