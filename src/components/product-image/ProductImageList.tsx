import React, {useEffect, useState} from 'react';
import {ProductAlternateImage} from "b2b-types";
import Stack from "@mui/material/Stack";
import {waitForIt} from "@utils/general";
import ResponsiveProductImage from "./ResponsiveProductImage";
import {sizesQuery} from "@components/product-image/utils";
import ProductCurrentImage from "@components/product-image/ProductCurrentImage";
import ProductAlternateImageList from "@components/product-image/ProductAlternateImageList";


export interface ProductImageListProps {
    primaryImage: ProductAlternateImage;
    images?: ProductAlternateImage[];
}

const ProductImageList = ({primaryImage, images}: ProductImageListProps) => {
    const [currentImage, setCurrentImage] = useState<ProductAlternateImage>(primaryImage);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setCurrentImage(primaryImage);
    }, [primaryImage]);


    const onSelectImage = async (img: ProductAlternateImage) => {
        if (img.image !== currentImage?.image) {
            setShow(false);
            await waitForIt(150);
            setCurrentImage(img);
            await waitForIt(150);
            setShow(true);
        }
    }

    if (!images || !images.length) {
        return (
            <ResponsiveProductImage filename={currentImage.image.replace(/\s/g, '%20')} alt={currentImage.altText}
                                    loading="eager"
                                    sizes={sizesQuery} width={800} height={800}/>
        )
    }

    return (
        <Stack direction="row" spacing={2}>
            <ProductCurrentImage image={currentImage} show={show}/>
            <ProductAlternateImageList images={[primaryImage, ...images]} currentImage={currentImage}
                                       onSelectImage={onSelectImage}/>
            <link rel="preload" as="image"
                  imageSrcSet={images.map(img => `/images/products/800/${img.image} 800w`).join(', ')}/>
        </Stack>
    )
}

export default ProductImageList
