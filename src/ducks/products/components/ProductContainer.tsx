import React from "react";
import {generatePath, Navigate, useParams} from "react-router";
import {useAppSelector} from "@/app/configureStore";
import {selectKeyword, selectKeywordsLoading} from "@/ducks/keywords";
import AppErrorBoundary from "@/src/common-components/AppErrorBoundary";
import LinearProgress from "@mui/material/LinearProgress";
import ProductPage from "@/ducks/products/components/ProductPage";

export default function ProductContainer() {
    const params = useParams<'category' | 'product'>();
    const keywordsLoading = useAppSelector(selectKeywordsLoading);
    const keyword = useAppSelector((state) => selectKeyword(state, params.product ?? ''));

    if (!keyword) return (
        <Navigate to="/products"/>
    );

    if (keyword.pagetype === 'category') {
        const redirect = generatePath('/products/:category', {
            category: keyword.keyword,
        });
        return <Navigate to={redirect}/>
    }

    return (
        <AppErrorBoundary>
            {keywordsLoading && <LinearProgress variant="indeterminate" title="Loading Keywords"/>}
            <ProductPage keyword={keyword.keyword}/>
        </AppErrorBoundary>
    )
}
