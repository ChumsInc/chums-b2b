import React from 'react';
import {Link as RoutedLink} from 'react-router-dom';
import ProductImage from "../product-image/ProductImage";
import SeasonTeaser from "../SeasonTeaser";
import {BasicProduct} from "b2b-types";
import CategoryGridItem from "./CategoryGridItem";
import Link from "@mui/material/Link";
import ProductAttributeStack from "@ducks/products/components/ProductAttrbuteStack";
import ResponsiveProductImage from "@components/product-image/ResponsiveProductImage";
import {parseImageFilename} from "@src/common/image";

const ProductLink = ({title, description, product, imageUrl, className = ''}: {
    title: string;
    description: string;
    product: BasicProduct;
    imageUrl: string;
    className?: string;
}) => {
    const link = product.defaultCategoryKeyword
        ? `/products/${product.defaultCategoryKeyword}/${product.keyword}`
        : `/products/${product.keyword}`;
    const _image = !imageUrl ? parseImageFilename(product.image, product.defaultColor) : imageUrl
    return (
        <CategoryGridItem className={className}>
            <Link component={RoutedLink} to={link} underline="hover">
                <ResponsiveProductImage filename={_image} title={title} alt={title}
                                        preferredSize={400}/>
                <div className="product-title">{title}</div>
                <ProductAttributeStack product={product}/>
                <SeasonTeaser season_teaser={product.season_teaser} season_active={product.season_active}
                              sx={{justifyContent: 'center'}}/>
            </Link>
            <div className="description">
                <div dangerouslySetInnerHTML={{__html: description}}/>
            </div>
        </CategoryGridItem>
    )
};

export default ProductLink;
