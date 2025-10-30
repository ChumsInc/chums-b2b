import {useEffect, useState} from 'react';
import DataTable, {type SortableTableField} from "@/components/common/DataTable";
import type {ShipToCustomer} from "b2b-types";
import {billToCustomerSlug, stateCountry} from "@/utils/customer.ts";
import {selectCustomerLoading, selectPrimaryShipTo} from "@/ducks/customer/selectors.ts";
import type {SortProps} from "@/types/generic.ts";
import TablePagination from "@mui/material/TablePagination";
import LinearProgress from "@mui/material/LinearProgress";
import {generatePath, NavLink} from "react-router";
import {PATH_CUSTOMER_DELIVERY} from "@/constants/paths.ts";
import classNames from "classnames";

import Box from "@mui/material/Box";
import PrimaryShipToIcon from "../common/PrimaryShipToIcon.tsx";
import Link, {type LinkProps} from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import ReloadCustomerButton from "../common/ReloadCustomerButton.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {
    selectShipToSort,
    selectSortedShipToList,
    setShipToSort
} from "@/ducks/customer/customerShipToAddressSlice.ts";

export interface ShipToLinkProps extends Omit<LinkProps, 'to'> {
    shipTo: ShipToCustomer;
}


const ShipToLink = ({shipTo, children, ...rest}: ShipToLinkProps) => {
    const path = generatePath(PATH_CUSTOMER_DELIVERY, {
        customerSlug: billToCustomerSlug(shipTo),
        code: encodeURIComponent(shipTo.ShipToCode)
    });
    return (
        <Link component={NavLink} to={path} {...rest}>{children}</Link>
    )
}
const fields: SortableTableField<ShipToCustomer>[] = [
    {
        field: 'ShipToCode', title: 'Code', sortable: true, render: (row) => (
            <ShipToLink shipTo={row} sx={{display: 'flex', alignItems: 'center'}}>
                <Box sx={{mr: 1}} component="span">{row.ShipToCode}</Box>
                <PrimaryShipToIcon shipToCode={row.ShipToCode}/>
            </ShipToLink>)
    },
    {
        field: 'ShipToName',
        title: 'Name',
        sortable: true,
        render: (row) => <ShipToLink shipTo={row}>{row.ShipToName}</ShipToLink>
    },
    {field: 'ShipToAddress1', title: 'Address', sortable: true, className: 'hidden-xs'},
    {field: 'ShipToCity', title: 'City', sortable: true, className: 'hidden-xs'},
    {field: 'ShipToState', title: 'State', sortable: true, render: (row) => stateCountry(row), className: 'hidden-xs'},
    {field: 'ShipToZipCode', title: 'Postal Code', sortable: true, className: 'hidden-xs'},
    {
        field: 'EmailAddress', title: 'Email', sortable: true, render: (row) => <span>{!!row.EmailAddress && (
            <Link href={`mailto:${row.EmailAddress}`} target="_blank">{row.EmailAddress}</Link>)}</span>
    }
]
const ShipToList = () => {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectSortedShipToList);
    const sort = useAppSelector(selectShipToSort);
    const loading = useAppSelector(selectCustomerLoading);
    const primaryShipTo = useAppSelector(selectPrimaryShipTo);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [list, sort, rowsPerPage]);

    const sortChangeHandler = (sort: SortProps<ShipToCustomer>) => {
        dispatch(setShipToSort(sort));
    }

    const rowClassName = (row: ShipToCustomer) => {
        return classNames({'table-primary': row.ShipToCode === primaryShipTo?.ShipToCode});
    }
    return (
        <div>
            {loading && (<LinearProgress variant="indeterminate"/>)}
            <DataTable data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                       rowClassName={rowClassName}
                       currentSort={sort} onChangeSort={sortChangeHandler}
                       fields={fields} keyField="ShipToCode"/>
            <Grid container spacing={2} justifyContent="end">
                <TablePagination component="div" count={list.length}
                                 page={page} onPageChange={(_, page) => setPage(page)}
                                 rowsPerPage={rowsPerPage}
                                 onRowsPerPageChange={(ev) => setRowsPerPage(+ev.target.value)}
                                 showFirstButton showLastButton/>
                <ReloadCustomerButton/>
            </Grid>
        </div>
    )
}

export default ShipToList;
