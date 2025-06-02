import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCartsSort, selectFilteredCarts, setCartsSort} from "@/ducks/carts/cartHeadersSlice";
import {SortProps} from "b2b-types";
import DataTable, {SortableTableField} from "../../../../common-components/DataTable";
import TablePagination from "@mui/material/TablePagination";
import CartButton from "./CartButton";
import {DateString} from "@/components/DateString";
import numeral from "numeral";
import Decimal from "decimal.js";
import {B2BCartHeader} from "@/types/cart/cart-header";
import CartLink from "@/ducks/carts/components/list/CartLink";
import {shipToLocation} from "@/ducks/carts/utils";


const cartFields: SortableTableField<B2BCartHeader>[] = [
    {field: 'id', title: 'Active Cart', render: (cart) => <CartButton cartId={cart.id}/>, sortable: false},
    {
        field: 'id',
        title: 'Cart #',
        render: (cart) => <CartLink cartId={cart.id}>{cart.id}</CartLink>,
        sortable: true
    },
    {field: 'customerPONo', title: 'Cart Name', sortable: true},
    {
        field: 'dateCreated',
        title: 'Cart Created',
        render: (cart) => <DateString date={cart.dateCreated}/>,
        sortable: true
    },
    {
        field: 'shipToName', title: 'Ship To', sortable: true,
        render: (cart) => (
            <span>{!!cart.shipToCode && (<span>[{cart.shipToCode}]</span>)} {cart.shipToName}</span>
        )
    },
    {
        field: 'ShipToCity',
        title: 'Location',
        render: (cart) => shipToLocation(cart),
        sortable: true
    },
    {
        field: 'subTotalAmt',
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
