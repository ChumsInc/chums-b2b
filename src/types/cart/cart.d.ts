import type {B2BCartHeader} from "./cart-header.d";
import type {B2BCartDetail, B2BCartDetailStatusList} from "./cart-detail.d";

export interface B2BCart {
    header: B2BCartHeader;
    detail: B2BCartDetail[];
    lineStatus?: B2BCartDetailStatusList;
}
