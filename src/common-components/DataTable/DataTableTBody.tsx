import React from "react";
import DataTableRow from "./DataTableRow";
import {noop} from "@/utils/general";
import TableBody from "@mui/material/TableBody";
import {DataTableTBodyProps} from "./types";


export const DataTableTBody = <T = unknown>({
                                                fields,
                                                data,
                                                keyField,
                                                rowClassName,
                                                renderRow,
                                                onSelectRow = noop,
                                                selected = null,
                                                children,
                                                ...rest
                                            }: DataTableTBodyProps<T>) => {

    return (
        <TableBody {...rest}>
            {data.map(row => {
                const keyValue = String(typeof keyField === "function" ? keyField(row) : row[keyField]);
                const isSelected = typeof selected === 'function' ? selected(row) : keyValue === (selected ?? false);
                if (renderRow) {
                    return renderRow(row);
                }
                return (
                    <DataTableRow key={keyValue} onClick={() => onSelectRow(row)}
                                  rowClassName={rowClassName}
                                  fields={fields}
                                  row={row} selected={isSelected}/>
                )
            })}
            {children}
        </TableBody>
    )
}

export default DataTableTBody;
