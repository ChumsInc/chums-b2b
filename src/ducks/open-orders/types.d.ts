import type {Editable, SalesOrder, SalesOrderDetailLine} from "chums-types/b2b";
import type {Appendable} from "@/types/generic";

export type EditableDetailLine = SalesOrderDetailLine & Editable & Appendable;

export interface OpenOrderDetailList {
    [key: string]: EditableDetailLine
}

export interface EditableSalesOrder extends SalesOrder {
    changed?: boolean;
    detail: OpenOrderDetailList;
}

