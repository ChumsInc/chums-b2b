import type {B2BCartHeader} from "./cart-header.d.ts";
import type {B2BCartDetail, B2BCartDetailStatusList} from "./cart-detail.d.ts";

export interface B2BCart {
    header: B2BCartHeader;
    detail: B2BCartDetail[];
    lineStatus?: B2BCartDetailStatusList;
}
