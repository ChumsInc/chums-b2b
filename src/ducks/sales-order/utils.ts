import type {CartItem, SalesOrderDetailLine, SalesOrderHeader} from "chums-types/b2b";
import type {SortProps} from "@/types/generic";
import dayjs from "dayjs";

/* eslint-disable no-nested-ternary */

export const defaultDetailSorter = (a: SalesOrderDetailLine, b: SalesOrderDetailLine) => {
    return +a.LineKey - +b.LineKey;
}

export const salesOrderSorter = (sort: SortProps<SalesOrderHeader>) =>
    (a: SalesOrderHeader, b: SalesOrderHeader) => {
        const sortMod = sort.ascending ? 1 : -1;
        switch (sort.field) {
            case 'CustomerPONo':
            case 'ShipToName':
            case "ShipToCity":
                return (
                    (a[sort.field] ?? '').toLowerCase() === (b[sort.field] ?? '').toLowerCase()
                        ? (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1)
                        : ((a[sort.field] ?? '').toLowerCase() > (b[sort.field] ?? '').toLowerCase() ? 1 : -1)
                ) * sortMod;
            case 'TaxableAmt':
                return (
                    +(a[sort.field] ?? 0) === +(b[sort.field] ?? 0)
                        ? (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1)
                        : (+(a[sort.field] ?? 0) > +(b[sort.field] ?? 0) ? 1 : -1)
                ) * sortMod;
            case 'OrderDate':
            case 'ShipExpireDate':
                return (
                    dayjs(a[sort.field] ?? null).valueOf() === dayjs(b[sort.field] ?? null).valueOf()
                        ? (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1)
                        : (dayjs(a[sort.field] ?? null).valueOf() > dayjs(b[sort.field] ?? 0).valueOf() ? 1 : -1)
                ) * sortMod;

            default:
                return (a.SalesOrderNo > b.SalesOrderNo ? 1 : -1) * sortMod;
        }
    }


export const detailToCartItem = (line: SalesOrderDetailLine): CartItem | null => {
    if (line.InactiveItem !== 'N' || line.ProductType === 'D') {
        return null;
    }
    return {
        itemCode: line.ItemCode,
        quantity: (+line.QuantityOrdered) || 1,
        comment: line.CommentText,
    }
}

export function isClosedSalesOrder(so: SalesOrderHeader | null): so is SalesOrderHeader {
    if (!so) {
        return false;
    }
    return so.OrderStatus === 'C';
}

export const detailSequenceSorter = (a: SalesOrderDetailLine, b: SalesOrderDetailLine): number => {
    return +a.LineSeqNo === +b.LineSeqNo
        ? defaultDetailSorter(a, b)
        : +a.LineSeqNo - +b.LineSeqNo;
}

