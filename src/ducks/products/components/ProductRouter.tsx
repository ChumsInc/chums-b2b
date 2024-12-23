import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {generatePath, useNavigate, useParams} from 'react-router';
import CategoryPage2 from "@components/category/CategoryPage";
import ProductPage from "./ProductPage";
import {PATH_PRODUCT} from "@constants/paths";
import ErrorBoundary from "../../../common-components/ErrorBoundary";
import {useAppDispatch} from "@app/configureStore";
import {Keyword} from "b2b-types";
import Box from "@mui/material/Box";
import {loadKeywords} from "../../keywords/actions";
import {selectKeywordsList, selectKeywordsLoading} from "../../keywords/selectors";
import LinearProgress from "@mui/material/LinearProgress";

const ProductRouter = () => {
    const dispatch = useAppDispatch();
    const keywords = useSelector(selectKeywordsList);
    const keywordsLoading = useSelector(selectKeywordsLoading);
    const {category, product} = useParams();
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<Keyword | null>(null);

    useEffect(() => {
        if (!keywords.length && !keywordsLoading) {
            dispatch(loadKeywords());
        }
    }, []);

    useEffect(() => {
        let keyword: Keyword | null = null;
        if (!!category && !product) {
            const [kw] = keywords.filter(kw => kw.keyword === category);
            if (kw) {
                keyword = {...kw};
            }
        } else if (product) {
            const [kw] = keywords.filter(kw => kw.keyword === product);
            if (kw) {
                keyword = {...kw};
            }
        }

        if (!keyword) {
            navigate('/products/all', {replace: true});
            return;
        }

        if (keyword.redirect_to_parent > 0) {
            const [kw] = keywords.filter(kw => kw.pagetype === 'product')
                .filter(kw => kw.id === keyword.redirect_to_parent);
            if (kw) {
                const path = generatePath(PATH_PRODUCT, {
                    category: kw.parent ? kw.parent : kw.keyword,
                    product: kw.parent ? kw.parent : ''
                })
                const state = {variant: keyword.keyword};
                navigate(path, {state, replace: true})
                return;
            }
        }
        setKeyword(keyword);
    }, [category, product, keywords]);

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

export default ProductRouter;
