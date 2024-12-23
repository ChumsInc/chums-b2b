import React from 'react';
import ProductImageCarousel from "@components/product-image/ProductImageCarousel";
import {useSelector} from "react-redux";
import {
    selectCurrentProduct,
    selectProductAltImages,
    selectProductCartItem,
    selectProductImage,
    selectProductLoading
} from "../selectors";

const ProductPageImage = () => {
    const cartItem = useSelector(selectProductCartItem);
    const loading = useSelector(selectProductLoading);
    const product = useSelector(selectCurrentProduct);
    const image = useSelector(selectProductImage)
    const altImages = useSelector(selectProductAltImages);

    if (!cartItem || !image || !image.filename) {
        return null;
    }

    return (
        <>
            <ProductImageCarousel image={image.filename}
                                  selectedItem={image.itemCode ?? ''}
                                  loading={loading}
                                  altImages={altImages}
                                  altText={product?.name}/>
            <link rel="preload" as="image"
                  imageSrcSet={altImages.map(img => `/images/products/800/${img.image} 800w`).join(', ')}/>

        </>
    )
}
export default ProductPageImage;

