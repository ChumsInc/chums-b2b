import type {ProductCategory} from "chums-types/b2b";

export interface CategoryState {
    keyword: string | null;
    category: ProductCategory | null;
    status: 'idle' | 'loading' | 'rejected';
}
