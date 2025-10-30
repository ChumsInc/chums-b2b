import type {ProductCategory} from "b2b-types";

export interface CategoryState {
    keyword: string | null;
    category: ProductCategory | null;
    status: 'idle' | 'loading' | 'rejected';
}
