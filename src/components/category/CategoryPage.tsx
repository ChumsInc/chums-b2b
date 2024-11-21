import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {loadCategory} from '@ducks/category/actions';
import CategoryPageElement from "./CategoryPageElement";
import DocumentTitle from "../DocumentTitle";
import {useAppDispatch} from "@app/configureStore";
import {selectCategory, selectCategoryLoading} from "@ducks/category/selectors";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2";
import {sendGtagEvent} from "@api/gtag";
import {isCategoryChildProduct} from "@ducks/products/utils";
import {CategoryChildProduct} from "b2b-types";

const CategoryPage = ({keyword}: {
    keyword: string;
}) => {
    const dispatch = useAppDispatch();
    const loading = useSelector(selectCategoryLoading);
    const category = useSelector(selectCategory);

    useEffect(() => {
        dispatch(loadCategory(keyword));
    }, [keyword]);

    useEffect(() => {
        if (category) {
            sendGtagEvent('view_item_list', {
                item_list_id: category.keyword,
                item_list_name: category.title ?? category.keyword,
                items: category.children.filter(child => isCategoryChildProduct(child))
                    .map(child => ({
                        item_id: (child as CategoryChildProduct).product.itemCode,
                        item_name: (child as CategoryChildProduct).product.name,
                    }))
            })
        }
    }, [category]);

    if (!category) {
        return (
            <Box>
                {loading && <LinearProgress variant="indeterminate"/>}
            </Box>
        )
    }

    const {title, lifestyle, pageText} = category;
    const children = category.children.filter(cat => !!cat.status).sort((a, b) => a.priority - b.priority);
    return (
        <Box>
            <DocumentTitle documentTitle={title}/>
            {!!lifestyle && <Box component="img" src={lifestyle} sx={{width: '100%'}} />}
            <Typography component="h1" variant="h1" sx={{textAlign: 'center', mb: 3}}>{title}</Typography>
            {loading && <LinearProgress variant="indeterminate"/>}
            {!!pageText && <Box dangerouslySetInnerHTML={{__html: pageText}}/>}
            <Grid2 container spacing={3} justifyContent={children.length < 4 ? 'center' : 'start'} sx={{mt: 3}} >
                {children
                    .filter(child => !!child.status)
                    .sort((a, b) => a.priority - b.priority)
                    .map(child => (
                        <CategoryPageElement key={child.id} item={child}/>
                    ))}
            </Grid2>
        </Box>
    )
}

export default CategoryPage;
