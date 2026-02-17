import SeasonTeaser from "./SeasonTeaser.tsx";
import type {BasicProduct} from "chums-types/b2b";
import CategoryGridItem from "./CategoryGridItem";
import ProductAttributeStack from "@/components/products/ProductAttrbuteStack.tsx";
import ResponsiveProductImage from "@/components/products/product-image/ResponsiveProductImage";
import {parseImageFilename} from "@/components/common/image";
import ProductLink from "@/components/common/ProductLink.tsx";
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
                <SeasonTeaser teaser={product.season_teaser} active={product.season_active}
                              sx={{justifyContent: 'center'}}/>
            </ProductLink>
            <div className="description">
                <HTMLContent html={description}/>
            </div>
        </CategoryGridItem>
    )
};

export default CategoryProductLink;
