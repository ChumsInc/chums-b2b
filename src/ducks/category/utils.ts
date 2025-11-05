import type {Keyword} from "chums-types/b2b";

export const categoryKeywordSorter = (a: Keyword, b: Keyword) => a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1;
