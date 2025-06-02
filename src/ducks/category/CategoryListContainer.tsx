import React from "react";
import {generatePath, Navigate, useParams} from "react-router";
import {useAppSelector} from "@/app/configureStore";
import {selectKeyword, selectKeywordsLoading} from "@/ducks/keywords";
import AppErrorBoundary from "../../common-components/AppErrorBoundary";
import LinearProgress from "@mui/material/LinearProgress";
import CategoryPage2 from "@/components/category/CategoryPage";

export default function CategoryListContainer() {
    const params = useParams();
    const keywordsLoading = useAppSelector(selectKeywordsLoading);
    const keyword = useAppSelector((state) => selectKeyword(state, params.category ?? ''));
    if (!keyword) return (
        <Navigate to="/products"/>
    );
    if (keyword.pagetype === 'product') {
        const redirect = generatePath('/products/:category/:product', {
            category: keyword.parent,
            product: keyword.keyword,
        });
        return <Navigate to={redirect}/>
    }

    if (keyword.pagetype === 'page') {
        const redirect = generatePath('/page/:keyword', {
            keyword: keyword.keyword,
        });
        return <Navigate to={redirect}/>
    }


    return (
        <AppErrorBoundary>
            {keywordsLoading && <LinearProgress variant="indeterminate" title="Loading Keywords"/>}
            <CategoryPage2 keyword={keyword.keyword}/>
        </AppErrorBoundary>
    )
}
