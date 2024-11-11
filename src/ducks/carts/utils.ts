import {SortProps} from "b2b-types";
import {B2BCartHeader} from "../../types/carts";
import Decimal from "decimal.js";

export const defaultCartsSort:SortProps<B2BCartHeader> = {
    field: 'id',
    ascending: true,
}

export const cartsSorter = ({field, ascending}:SortProps<B2BCartHeader>) => (a:B2BCartHeader, b:B2BCartHeader) => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'salesOrderNo':
        case 'customerPONo':
        case 'dateCreated':
        case 'shipToName':
            return (
                (a[field] ?? '').toLowerCase() === (b[field] ?? '').toLowerCase()
                ? (a.id - b.id)
                : (
                    (a[field] ?? '').toLowerCase() > (b[field] ?? '').toLowerCase()
                        ? 1
                        : -1
                    )
            ) * sortMod;
        case 'subTotalAmt':
            return (
                new Decimal(a[field]).eq(b[field])
                    ? a.id - b.id
                    : (
                        new Decimal(a[field]).gt(b[field])
                            ? 1
                            : -1
                    )
            ) * sortMod
        case 'id':
        default:
            return (a.id - b.id) * sortMod;
    }
}
