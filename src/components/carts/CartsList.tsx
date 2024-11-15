import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {selectCartsSort, selectFilteredCarts} from "@ducks/carts/selectors";
import {SortProps} from "b2b-types";
import DataTable, {SortableTableField} from "../../common-components/DataTable";
import TablePagination from "@mui/material/TablePagination";
import CartButton from "../CartButton";
import {DateString} from "../DateString";
import numeral from "numeral";
import Decimal from "decimal.js";
import {B2BCartHeader} from "@typeDefs/cart/cart-header";
import CartLink from "@components/carts/CartLink";
import {setCartsSort} from "@ducks/carts/actions";


const cartFields: SortableTableField<B2BCartHeader>[] = [
    {field: 'id', title: 'Cart', render: (so) => <CartButton salesOrderNo={so.salesOrderNo}/>},
    {
        field: 'salesOrderNo',
        title: 'Order #',
        render: (so) => <CartLink cartId={so.id}>{so.salesOrderNo ?? 'pending'}</CartLink>,
        sortable: true
    },
    {field: 'customerPONo', title: 'PO #', sortable: true},
    {
        field: 'dateCreated',
        title: 'Ordered Created',
        render: (so) => <DateString date={so.dateCreated}/>,
        sortable: true
    },
    {
        field: 'ShipToName', title: 'Ship To', sortable: true, render: (row) => (
            <span>{!!row.shipToCode && (<span>[{row.shipToCode}]</span>)} {row.ShipToName}</span>
        )
    },
    {
        field: 'ShipToCity',
        title: 'Location',
        render: (so) => `${so.ShipToCity}, ${so.ShipToState} ${so.ShipToZipCode}`,
        sortable: true
    },
    {
        field: 'NonTaxableAmt',
        title: 'Total',
        render: (so) => numeral(new Decimal(so.subTotalAmt)).format('0,0.00'),
        align: 'right',
        sortable: true,
    }
];

export default function CartsList() {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectFilteredCarts);
    const sort = useAppSelector(selectCartsSort);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [list, sort]);

    const rowsPerPageChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+ev.target.value);
        setPage(0);
    }

    const sortChangeHandler = (sort: SortProps<B2BCartHeader>) => {
        dispatch(setCartsSort(sort));
    }

    return (
        <div>
            <DataTable<B2BCartHeader> keyField="id"
                                      data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                      fields={cartFields} currentSort={sort} onChangeSort={sortChangeHandler}/>
            <TablePagination component="div"
                             count={list.length} page={page} rowsPerPage={rowsPerPage}
                             onPageChange={(ev, page) => setPage(page)}
                             onRowsPerPageChange={rowsPerPageChangeHandler}
                             showFirstButton={list.length > rowsPerPage} showLastButton={list.length > rowsPerPage}/>
        </div>
    );

}
