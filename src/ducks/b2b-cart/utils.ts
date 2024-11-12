import {SortProps} from "b2b-types";
import {B2BCartDetail} from "@typeDefs/carts";

export const cartDetailSorter = ({
                                     field,
                                     ascending
                                 }: SortProps<B2BCartDetail>) => (a: B2BCartDetail, b: B2BCartDetail) => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'itemCode':
        case 'itemCodeDesc':
            return (
                (a[field] ?? '').toLowerCase() === (b[field] ?? '').toLowerCase()
                    ? a.id - b.id
                    : ((a[field] ?? '').toLowerCase() > (b[field] ?? '').toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'id':
        default:
            return (a.id - b.id) * sortMod;
    }
}


export const defaultCartDetailSort: SortProps<B2BCartDetail> = {field: 'id', ascending: true};

