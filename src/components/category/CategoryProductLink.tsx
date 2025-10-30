import SeasonTeaser from "../SeasonTeaser";
import type {BasicProduct} from "b2b-types";
import CategoryGridItem from "./CategoryGridItem";
import ProductAttributeStack from "@/ducks/products/components/ProductAttrbuteStack";
import ResponsiveProductImage from "@/components/product-image/ResponsiveProductImage";
import {parseImageFilename} from "@/components/common/image";
import ProductLink from "@/components/ProductLink";
import HTMLContent from "@/components/common/HTMLContent";

const CategoryProductLink = ({title, description, product, imageUrl, className = ''}: {
    title: string;
    description: string;
    product: BasicProduct;
    imageUrl: string;
    className?: string;
}) => {
    const _image = !imageUrl ? parseImageFilename(product.image, product.defaultColor) : imageUrl
    return (
        <CategoryGridItem className={className}>
            <ProductLink categoryKeyword={product.defaultCategoryKeyword} productKeyword={product.keyword}>
                <ResponsiveProductImage filename={_image} title={title} alt={title}
                                        preferredSize={400}/>
                <div className="product-title">{title}</div>
                <ProductAttributeStack product={product}/>
                <SeasonTeaser season_teaser={product.season_teaser} season_active={product.season_active}
                              sx={{justifyContent: 'center'}}/>
            </ProductLink>
            <div className="description">
                <HTMLContent html={description}/>
            </div>
        </CategoryGridItem>
    )
};

export default CategoryProductLink;
