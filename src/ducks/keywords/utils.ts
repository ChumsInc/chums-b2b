import type {Keyword} from "chums-types/b2b";


export const keywordsSorter = (a: Keyword, b: Keyword) => {
    return a.keyword.toLowerCase() > b.keyword.toLowerCase() ? 1 : -1;
}

