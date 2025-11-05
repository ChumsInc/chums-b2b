import {ORDER_TYPE} from "@/constants/orders";
import type {OrderType} from "@/types/salesorder";
import type {SalesOrderHeader} from "chums-types/b2b";
import {isSalesOrderHeader} from "./typeguards";


export const calcOrderType = (salesOrder: SalesOrderHeader | null): OrderType | null => {
    if (!isSalesOrderHeader(salesOrder)) {
        return null;
    }
    switch (salesOrder.OrderType) {
        case 'S':
            return ORDER_TYPE.open;
        case 'M':
            return ORDER_TYPE.master;
    }
    switch (salesOrder.OrderStatus) {
        case 'C':
            return ORDER_TYPE.past;
        case 'O':
        case 'H':
        case 'N':
            return ORDER_TYPE.open;
    }
    return null;
};

export const isOpenOrder = (header: SalesOrderHeader | null) => calcOrderType(header) === ORDER_TYPE.open;
export const isPastOrder = (header: SalesOrderHeader | null) => calcOrderType(header) === ORDER_TYPE.past;

export const filterOrder = (list: SalesOrderHeader[] = [], salesOrderNo: string): SalesOrderHeader | null => {
    const [salesOrder] = list.filter(so => so.SalesOrderNo === salesOrderNo);
    return salesOrder ?? null;
};
