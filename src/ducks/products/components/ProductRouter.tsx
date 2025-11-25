import {generatePath, useNavigate, useParams} from 'react-router';
import CategoryPage2 from "@/components/category/CategoryPage";
import ProductPage from "./ProductPage";
import {PATH_PRODUCT} from "@/constants/paths";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import {useAppSelector} from "@/app/hooks";
import type {Keyword} from "chums-types/b2b";
import Box from "@mui/material/Box";
import {selectKeywordsList, selectKeywordsLoading} from "../../keywords/selectors";
import LinearProgress from "@mui/material/LinearProgress";

function filterCategory(category: string | undefined, product: string | undefined, list: Keyword[]): Keyword | null {
    if (product) {
        const kw = list.find(_kw => _kw.keyword === product);
        if (kw) {
            return kw;
        }
    }
    if (category) {
        const kw = list.find(_kw => _kw.keyword === category);
        if (kw) {
            return kw;
        }
    }

    return null;
}

export default function ProductRouter() {
    const keywords = useAppSelector(selectKeywordsList);
    const keywordsLoading = useAppSelector(selectKeywordsLoading);
    const {category, product} = useParams<'category' | 'product'>();
    const navigate = useNavigate();
    const keyword = filterCategory(category, product, keywords);

    if (!keyword) {
        navigate('/products/all', {replace: true});
        return null;
    }

    if (keyword.redirect_to_parent > 0) {
        const kw = keywords.filter(_kw => _kw.pagetype === 'product')
            .find(_kw => _kw.id === keyword.redirect_to_parent);
        if (kw) {
            const path = generatePath(PATH_PRODUCT, {
                category: kw.parent ? kw.parent : kw.keyword,
                product: kw.parent ? kw.keyword : ''
            })
            const state = {variant: keyword.keyword};
            navigate(path, {state, replace: true})
            return null;
        }
        navigate('/products/all', {replace: true});
        return null;
    }

    return (
        <ErrorBoundary>
            <Box>
                {keywordsLoading && <LinearProgress variant="indeterminate" title="Loading Keywords"/>}
                {keyword?.pagetype === 'category' && <CategoryPage2 keyword={keyword.keyword}/>}
                {keyword?.pagetype === 'product' && (<ProductPage keyword={keyword.keyword}/>)}
            </Box>
        </ErrorBoundary>
    );
}
