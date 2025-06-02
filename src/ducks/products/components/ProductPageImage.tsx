import React from "react";
import ProductImageCarousel from "@/components/product-image/ProductImageCarousel";
import {
    selectCurrentProduct,
    selectProductAltImages,
    selectProductCartItem,
    selectProductImage,
    selectProductLoading
} from "../selectors";
import {useAppSelector} from "@/app/configureStore";

const ProductPageImage = () => {
    const cartItem = useAppSelector(selectProductCartItem);
    const loading = useAppSelector(selectProductLoading);
    const product = useAppSelector(selectCurrentProduct);
    const image = useAppSelector(selectProductImage)
    const altImages = useAppSelector(selectProductAltImages);

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

