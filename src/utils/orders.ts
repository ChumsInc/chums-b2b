import {ORDER_TYPE} from "@/constants/orders";
import dayjs, {Dayjs} from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'
import {OrderType} from "../types/salesorder";
import {SalesOrderHeader} from "b2b-types";
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

// export const filterOrderFromState = (state:RootState, salesOrderNo:string) => {
//     const {carts, openOrders, invoices} = state;
//     return filterOrder([...carts.list, ...openOrders.list, ...invoices.list], salesOrderNo);
// };

const isInWorkWeek = (date: Date | string | number | Dayjs) => {
    const day = dayjs(date).day();
    return (day > 0 && day < 5)
        || (day === 5 && dayjs(date).hour() < 12);
};

const nextWorkDay = (date: string | number | Date | dayjs.Dayjs = new Date()): string => {
    const d = dayjs(date).add(1, 'day');
    const day = d.day();
    switch (day) {
        case 0: // sunday
            // set date to monday
            return d.day(1).toISOString();
        case 6: // saturday
            // set date to next monday
            return d.day(8).toISOString();
        default:
            return d.toISOString();
    }
}

const addWorkDays = (date: Date | string | number | Dayjs, days: number): string => {
    if (days < 1) {
        return dayjs(date).toISOString();
    }
    let d = dayjs(date);
    for (let i = 0; i < days; i += 1) {
        d = dayjs(nextWorkDay(d));
    }
    return d.toISOString();
}

export const minShipDate = (hasCustomization?:boolean): string => {
    const _dayjs = dayjs;
    _dayjs.extend(utc);
    _dayjs.extend(timezone);

    const _printDate = _dayjs().tz('America/Denver').startOf('day');
    return _dayjs(addWorkDays(_printDate, hasCustomization ? 8 : 6)).startOf('day').toISOString();
}

export const nextShipDate = (shipDate?: Date | number | string | Dayjs | undefined, hasCustomization?: boolean|undefined): string => {
    if (!shipDate) {
        shipDate = new Date();
    }
    const min = minShipDate(hasCustomization);
    if (!isInWorkWeek(shipDate)) {
        const isSunday = dayjs(shipDate).day() === 0;
        shipDate = dayjs(shipDate).day(isSunday ? 1 : 8).toDate().toISOString();
    }
    if (dayjs(shipDate).valueOf() >= dayjs(min).valueOf()) {
        return shipDate.toString();
    }
    return min;
};
