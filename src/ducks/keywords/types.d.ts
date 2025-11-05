import type {Keyword} from "chums-types/b2b";

export interface KeywordsState {
    list: Keyword[],
    loading: boolean;
}
