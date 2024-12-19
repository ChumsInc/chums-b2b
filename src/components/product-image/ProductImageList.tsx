import React, {useEffect, useState} from 'react';
import {ProductAlternateImage} from "b2b-types";
import Stack from "@mui/material/Stack";
import {waitForIt} from "@utils/general";
import ResponsiveProductImage from "./ResponsiveProductImage";
import {sizesQuery} from "@components/product-image/utils";
import ProductCurrentImage from "@components/product-image/ProductCurrentImage";
import ProductAlternateImageList from "@components/product-image/ProductAlternateImageList";

const imageSort = (a:ProductAlternateImage, b:ProductAlternateImage) => {
    return a.priority === b.priority
        ? (a.id - b.id)
        : (a.priority -  b.priority);
}

export interface ProductImageListProps {
    mainImage: ProductAlternateImage|null;
    alternateImages?: ProductAlternateImage[];
}

const ProductImageList = ({mainImage, alternateImages}: ProductImageListProps) => {
    const [currentImage, setCurrentImage] = useState<ProductAlternateImage|null>(mainImage);
    const [images, setImages] = useState<ProductAlternateImage[]>([]);

    useEffect(() => {
        setCurrentImage(mainImage);
        if (mainImage) {
            setImages([mainImage, ...(alternateImages ?? [])].sort(imageSort))
        } else {
            setImages([...(alternateImages ?? [])].sort(imageSort));
        }

    }, [mainImage, alternateImages]);


    const onSelectImage = async (img: ProductAlternateImage) => {
        if (img.image !== currentImage?.image) {
            setCurrentImage(img);
        }
    }

    if (!currentImage) {
        return null;
    }

    if (!alternateImages || !alternateImages.length) {
        return (
            <ResponsiveProductImage filename={currentImage.image.replace(/\s/g, '%20')} alt={currentImage.altText}
                                    loading="eager"
                                    sizes={sizesQuery} width={800} height={800}/>
        )
    }

    return (
        <Stack direction="row" spacing={2}>
            <ProductCurrentImage image={currentImage}/>
            <ProductAlternateImageList images={images} currentImage={currentImage}
                                       onSelectImage={onSelectImage}/>
            <link rel="preload" as="image"
                  imageSrcSet={alternateImages.map(img => `/images/products/800/${img.image} 800w`).join(', ')}/>
        </Stack>
    )
}

export default ProductImageList
