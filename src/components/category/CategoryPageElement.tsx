import React from 'react';
import CategoryLink from "./CategoryLink";
import CategoryProductLink from "./CategoryProductLink";
import {Link as RoutedLink} from "react-router";
import {ProductCategoryChild} from "b2b-types";
import {
    isCategoryChildCategory,
    isCategoryChildLink,
    isCategoryChildProduct,
    isCategoryChildSection
} from "@/ducks/products/utils";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import CategoryGridItem from "./CategoryGridItem";
import ResponsiveProductImage from "@/components/product-image/ResponsiveProductImage";
import Typography from "@mui/material/Typography";
import HTMLContent from "@/src/common-components/HTMLContent";


export const ITEM_TYPES = {
    product: 'product',
    category: 'category',
    section: 'section',
    link: 'link',
    other: '',
};

const imageSizes = "(max-width: 600px) 168px, (max-width: 900px) 268px, 354px";

export interface CategoryPageElementProps {
    item: ProductCategoryChild;
}
export default function CategoryPageElement({item}: CategoryPageElementProps) {
    if (isCategoryChildCategory(item)) {
        return (<CategoryLink title={item.title} description={item.description}
                              keyword={item.category.keyword} imageUrl={item.imageUrl}/>);
    }
    if (isCategoryChildProduct(item)) {
        return (<CategoryProductLink title={item.title} description={item.description}
                                     product={item.product} imageUrl={item.imageUrl}/>);
    }
    if (isCategoryChildLink(item) && item.urlOverride) {
        return (
            <CategoryGridItem className={item.className}>
                <Link component={RoutedLink} to={item.urlOverride}>
                    {!!item.imageUrl && (
                        <ResponsiveProductImage filename={item.imageUrl} alt={item.title} loading="lazy"
                                                sizes={imageSizes}
                                                width={400} height={400}/>
                    )}
                    <div className="product-title">{item.title}</div>
                </Link>
                <div className="description">
                    <HTMLContent html={item.description}/>
                </div>
            </CategoryGridItem>
        );
    }
    if (isCategoryChildLink(item)) {
        return (
            <CategoryGridItem className={item.className}>
                {!!item.imageUrl && (
                    <ResponsiveProductImage filename={item.imageUrl} alt={item.title} loading="lazy"
                                            sizes={imageSizes}
                                            width={400} height={400}/>
                )}
                <div className="product-title">{item.title}</div>
                <div className="description">
                    <HTMLContent html={item.description}/>
                </div>
            </CategoryGridItem>
        );
    }
    if (isCategoryChildSection(item)) {
        return (
            <Grid size={12} className={item.className}>
                <Typography variant="h3" component="h3" sx={{textAlign: 'center'}}>{item.sectionTitle}</Typography>
                {!!item.sectionDescription && (
                    <Typography variant="subtitle1" sx={{textAlign: 'center'}}>{item.sectionDescription}</Typography>
                )}
            </Grid>
        )
    }
    return null;
};
