import {type ChangeEvent, useEffect, useState} from 'react';
import DataTable, {type SortableTableField} from "@/components/common/DataTable";
import TablePagination from "@mui/material/TablePagination";
import type {SalesOrderHeader} from "chums-types/b2b";
import type {SortProps} from "@/types/generic";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectOpenOrdersSort, setSalesOrderSort} from "@/ducks/open-orders/openOrdersSlice";

export default function OrdersList({
                                       list,
                                       fields,
                                   }: {
    list: SalesOrderHeader[];
    fields: SortableTableField<SalesOrderHeader>[];
}) {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectOpenOrdersSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        setPage(0);
    }, [list, sort]);

    const rowsPerPageChangeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+ev.target.value);
        setPage(0);
    }

    const sortChangeHandler = (arg: SortProps<SalesOrderHeader>) => {
        dispatch(setSalesOrderSort(arg));
    }

    return (
        <div>
            <DataTable<SalesOrderHeader> keyField="SalesOrderNo"
                                         data={list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                                         fields={fields} currentSort={sort} onChangeSort={sortChangeHandler}/>
            <TablePagination component="div"
                             count={list.length} page={page} rowsPerPage={rowsPerPage}
                             onPageChange={(_, arg) => setPage(arg)}
                             onRowsPerPageChange={rowsPerPageChangeHandler}
                             showFirstButton showLastButton/>
        </div>
    );
}

