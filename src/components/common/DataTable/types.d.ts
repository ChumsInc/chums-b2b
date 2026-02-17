import type {ReactElement, ReactNode, Ref, TableHTMLAttributes} from "react";
import type classNames from "classnames";
import type {SortProps} from "@/types/generic";

export type TableSelected<T = unknown> = string | number | null | boolean | ((row: T) => boolean);

export interface DataTableProps<T = unknown> extends TableHTMLAttributes<HTMLTableElement> {
    fields: DataTableField<T>[],
    data: T[],
    keyField: keyof T | ((row: T) => string | number),
    rowClassName?: DataTableClassNames;
    renderRow?: (row: T) => ReactNode;
    onSelectRow?: (row: T) => T | void,
    selected?: TableSelected<T>;
    tfoot?: ReactElement<HTMLTableSectionElement>,
    children?: ReactNode,
}

export type DataTableClassNames<T = unknown> =
    string
    | classNames.Argument
    | ((row: T) => (string | classNames.Argument));

export interface DataTableField<T = unknown> {
    id?: number | string;
    field: keyof T,
    title: ReactNode,
    align?: 'left' | 'center' | 'right';
    render?: (row: T) => ReactNode,
    className?: DataTableClassNames<T>,
    colSpan?: number,
}

export interface SortableTableField<T = unknown> extends DataTableField<T> {
    sortable?: boolean,
}


export interface DataTableRowProps<T = unknown> extends Omit <TableHTMLAttributes<HTMLTableRowElement>, 'onClick'> {
    rowClassName?: string | classNames.Argument | ((row: T) => string | classNames.Argument),
    selected?: boolean,
    fields: DataTableField<T>[],
    row: T,
    trRef?: Ref<HTMLTableRowElement>,
    onClick?: (row?: T) => T | void,
}

export interface DataTableTBodyProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    fields: DataTableField<T>[];
    data: T[];
    keyField: keyof T | ((row: T) => string | number);
    rowClassName?: DataTableClassNames<T>;
    renderRow?: (row: T) => ReactNode;
    onSelectRow?: (row: T) => T | void;
    selected?: TableSelected<T>;
    children?: ReactNode;
}

export interface SortableTableProps<T = unknown> extends DataTableProps<T> {
    currentSort: SortProps<T>,
    onChangeSort: (sort: SortProps<T>) => void,
}

export interface DataTableHeadProps<T = unknown> extends TableHTMLAttributes<HTMLTableSectionElement> {
    fields: DataTableField<T>[];
}

export interface SortableTableHeadProps<T = unknown> extends DataTableHeadProps {
    currentSort: SortProps<T>,
    fields: SortableTableField<T>[],
    onChangeSort: (sort: SortProps<T>) => void,
}
