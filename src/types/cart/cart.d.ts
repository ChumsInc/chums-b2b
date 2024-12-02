import {B2BCartHeader} from "./cart-header.d.ts";
import {B2BCartDetail, B2BCartDetailStatusList} from "./cart-detail.d.ts";

export interface B2BCart {
    header: B2BCartHeader;
    detail: B2BCartDetail[];
    status?: 'idle'|'loading'|'saving'|'deleting';
    lineStatus?: B2BCartDetailStatusList;
    detailLoaded?: boolean;
}
