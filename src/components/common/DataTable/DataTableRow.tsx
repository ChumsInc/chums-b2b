import classNames from "classnames";
import {noop} from "@/utils/general.ts";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type {DataTableRowProps} from "./types";
import type {KeyedObject} from "@/types/generic.ts";

export const DataTableRow = <T = KeyedObject>({
                          className,
                          rowClassName,
                          selected,
                          fields,
                          row,
                          trRef,
                          onClick = noop,
                          ...rest
                      }: DataTableRowProps<T>) => {
    const clickHandler = () => {
        return onClick ? onClick() : noop();
    }

    const _className = typeof rowClassName === 'function' ? rowClassName(row) : rowClassName;

    return (
        <TableRow ref={trRef} className={classNames({'table-active': selected}, className, _className)}
                  onClick={clickHandler} {...rest}>
            {fields.map((field, index) => {
                const fieldClassName = typeof field.className === 'function' ? field.className(row) : field.className;
                if (typeof field.render === 'function') {
                    return (
                        <TableCell key={index} align={field.align} className={classNames(fieldClassName)}
                                   colSpan={field.colSpan}>{field.render(row)}</TableCell>
                    );
                }
                return (
                    <TableCell key={index} align={field.align} className={classNames(fieldClassName)}
                                   colSpan={field.colSpan}>
                        {String(row[field.field] ?? '')}
                    </TableCell>
                );
            })}
        </TableRow>
    )
}

export default DataTableRow;
