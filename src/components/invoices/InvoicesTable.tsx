import {type TableComponents, TableVirtuoso} from "react-virtuoso";
import {forwardRef} from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {useAppSelector} from "@/app/hooks.ts";
import Box from "@mui/material/Box";
import {selectFilteredInvoicesList, selectInvoicesLoaded} from "@/ducks/invoices/invoiceListSlice.ts";
import InvoiceTableHeader from "@/components/invoices/InvoiceTableHeader.tsx";
import TableCell from "@mui/material/TableCell";
import type {InvoiceHistoryHeader} from "chums-types/b2b";
import {invoiceFields} from "@/components/invoices/invoiceTableColumns.tsx";
import NoInvoicesAlert from "@/components/invoices/NoInvoicesAlert.tsx";

const VirtuosoTableComponents: TableComponents<InvoiceHistoryHeader> = {
    Scroller: forwardRef<HTMLDivElement>(function VirtualTableScroller(props, ref) {
        return (<TableContainer component={Paper} {...props} ref={ref} elevation={0}/>)
    }),
    Table: (props) => (
        <Table {...props} sx={{borderCollapse: 'separate', tableLayout: 'fixed'}}/>
    ),
    TableRow: ({item, ...props}) => <TableRow {...props} />,
    TableBody: forwardRef<HTMLTableSectionElement>(function VirtualTableBody(props, ref) {
        return (<TableBody {...props} ref={ref}/>)
    })
}
export default function InvoicesTable() {
    const invoices = useAppSelector(selectFilteredInvoicesList);
    const loaded = useAppSelector(selectInvoicesLoaded);
    return (
        <Box sx={{height: 600, maxHeight: '75vh', width: '100%', mb: 3}}>
            {loaded && invoices.length === 0 && (
                <NoInvoicesAlert />
            )}
            <TableVirtuoso data={invoices}
                           components={VirtuosoTableComponents}
                           fixedHeaderContent={InvoiceTableHeader}
                           itemContent={rowContent}/>
        </Box>
    )
}

function rowContent(_index: number, row: InvoiceHistoryHeader) {
    return (
        <>
            {invoiceFields.map(column => (
                <TableCell key={column.id ?? column.field} align={column.align} sx={column.sx}>
                    {column.render ? column.render(row) : row[column.field]}
                </TableCell>
            ))}
        </>
    )
}
