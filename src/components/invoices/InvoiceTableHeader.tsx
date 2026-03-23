import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import {selectInvoicesSort, setInvoicesSort} from "@/ducks/invoices/invoiceListSlice.ts";
import type {InvoiceHistoryHeader} from "chums-types/b2b";
import {canStorePreferences} from "@/ducks/cookie-consent/utils.ts";
import localStore from "@/utils/LocalStore.ts";
import type {SortProps} from "@/types/generic.ts";
import {STORE_INVOICES_SORT} from "@/constants/stores.ts";
import {invoiceFields} from "@/components/invoices/invoiceTableColumns.tsx";

export default function InvoiceTableHeader() {
    const dispatch = useAppDispatch();
    const sort = useAppSelector(selectInvoicesSort);
    const sortDirection = sort.ascending ? 'asc' : 'desc';

    const sortHandler = (field: keyof InvoiceHistoryHeader) => () => {
        const nextSort = sort.field === field ? {field, ascending: !sort.ascending} : {field, ascending: true};
        if (canStorePreferences()) {
            localStore.setItem<SortProps<InvoiceHistoryHeader>>(STORE_INVOICES_SORT, nextSort);
        }
        dispatch(setInvoicesSort(nextSort));
    }

    return (
        <TableRow>
            {invoiceFields.map(col => (
                <TableCell key={col.id ?? col.field} variant="head" component="th"
                           sortDirection={col.field === sort.field ? sortDirection : false}
                           align={col.align} style={{width: col.width}}
                           sx={{backgroundColor: 'background.paper', ...col.sx}}>
                    <TableSortLabel active={sort.field === col.field}
                                    direction={sort.field === col.field ? sortDirection : 'asc'}
                                    onClick={sortHandler(col.field)}>
                        {col.title}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    )
}
