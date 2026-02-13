import type {SearchResult} from "chums-types/b2b";
import {generatePath} from "react-router";
import {PATH_CATEGORY, PATH_PAGE, PATH_PRODUCT, PATH_PRODUCT_WITHOUT_PARENT} from "@/constants/paths";

export const searchItemLink = (result: SearchResult) => {
    switch (result.pagetype) {
        case 'category':
            return generatePath(PATH_CATEGORY, {category: result.keyword});
        case 'page':
            return generatePath(PATH_PAGE, {keyword: result.keyword});
        default:
            if (result.parent) {
                return generatePath(PATH_PRODUCT, {category: result.parent, product: result.keyword})
            }
            return generatePath(PATH_PRODUCT_WITHOUT_PARENT, {product: result.keyword})
    }
}
