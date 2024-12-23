import {Keyword, ProductCategory} from "b2b-types";

export interface CategoryState {
    keyword: string|null;
    list: Keyword[];
    category: ProductCategory | null;
    content: ProductCategory | null;
    loading: boolean;
}
