/**
 * Created by steve on 11/8/2016.
 */

import React, {useCallback, useEffect, useState} from 'react';
import {ProductAlternateImage} from "b2b-types";
import {parseImageFilename} from "@/src/common/image";
import ResponsiveProductImage from "@/components/product-image/ResponsiveProductImage";
import {sizesQuery} from "@/components/product-image/utils";
import ProductCurrentImage from "@/components/product-image/ProductCurrentImage";
import ProductAlternateImageList from "@/components/product-image/ProductAlternateImageList";
import Stack from "@mui/material/Stack";

export type ToMainImageProps = Pick<ProductImageProps, 'image' | 'colorCode' | 'altText'>;

function toMainImage({image, colorCode, altText}: ToMainImageProps): ProductAlternateImage {
    return {
        id: 0,
        productId: 0,
        image: parseImageFilename(image, colorCode),
        altText: altText ?? '',
        status: true,
        priority: -1,
    }
}

export type FilterCurrentImagesProps = Pick<ProductImageProps, 'selectedItem' | 'altImages'>;

function filterCurrentImages({selectedItem, altImages}: FilterCurrentImagesProps): ProductAlternateImage[] {
    if (!altImages || !altImages.length || !selectedItem) {
        return [];
    }
    const selectedItemHash = `#${selectedItem}`;
    const filter = /^#[A-Z0-9]+/i;
    return altImages
        .filter(img => !!img.status)
        .filter(img => {
            return !filter.test(img.altText) || img.altText.includes(selectedItemHash);
        });
}

export interface ProductImageProps {
    image: string;
    altImages?: ProductAlternateImage[],
    selectedItem?: string | null;
    colorCode?: string;
    size?: string | number;
    className?: string;
    title?: string;
    altText?: string;
    loading?: boolean;
}

/**
 * @TODO: Add alternate images from variants if available, eliminate duplicates.
 * @TODO: Allow custom images in mixes.
 */
export default function ProductImageCarousel(props: ProductImageProps) {
    const [currentImage, setCurrentImage] = useState<ProductAlternateImage>(toMainImage(props));
    const [carouselImages, setCarouselImages] = useState<ProductAlternateImage[]>([toMainImage(props), ...filterCurrentImages(props)]);
    const onSelectImage = useCallback((image: ProductAlternateImage) => {
        if (image.image !== currentImage.image) {
            setCurrentImage(image);
        }
    }, [currentImage])

    useEffect(() => {
        const mainImage = toMainImage(props);
        setCurrentImage(mainImage);
        setCarouselImages([mainImage, ...filterCurrentImages(props)]);
    }, [props]);

    if (carouselImages.length < 2) {
        return (
            <ResponsiveProductImage filename={currentImage.image.replace(/\s/g, '%20')} alt={currentImage.altText}
                                    loading="eager"
                                    sizes={sizesQuery} width={800} height={800}/>
        )
    }

    return (
        <Stack direction="row" spacing={2}>
            <ProductCurrentImage image={currentImage}/>
            <ProductAlternateImageList images={carouselImages} currentImage={currentImage}
                                       onSelectImage={onSelectImage}/>
        </Stack>
    );
}
