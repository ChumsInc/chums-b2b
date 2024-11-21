/**
 * Created by steve on 11/8/2016.
 */

import React, {useEffect, useState} from 'react';
import {parseImageFilename} from '../../common/image';
import {ProductAlternateImage} from "b2b-types";
import ProductImageList from "./ProductImageList";

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

const buildMainImage = (filename: string, colorCode?: string, altText?: string):ProductAlternateImage => {
    return {
        id: 0,
        productId: 0,
        image: parseImageFilename(filename, colorCode),
        altText: altText ?? '',
        status: true,
        priority: -1,
    }
}

/**
 * @TODO: Add alternate images from variants if available, eliminate duplicates.
 * @TODO: Allow custom images in mixes.
 */
export default function ProductImage({
                                         image,
                                         altImages = [],
                                         selectedItem = null,
                                         colorCode = '',
                                         altText = '',
                                     }: ProductImageProps) {
    const [selectedItemHash, setSelectedItemHash] = useState(`#${selectedItem}`);
    const [carouselImages, setCarouselImages] = useState<ProductAlternateImage[]>([]);
    const [mainImage, setMainImage] = useState<ProductAlternateImage>(buildMainImage(image, colorCode, altText))

    useEffect(() => {
        setMainImage(buildMainImage(image, colorCode, altText))
    }, [image, colorCode, altText]);

    useEffect(() => {
        setSelectedItemHash(`#${selectedItem}`)
    }, [selectedItem]);

    useEffect(() => {
        const filter = /^#[A-Z0-9]+/i;
        const carouselImages = altImages
            .filter(img => !!img.status)
            .filter(img => {
                return !filter.test(img.altText) || img.altText.includes(selectedItemHash);
            });
        setCarouselImages(carouselImages);
    }, [selectedItemHash, altImages])

    return (
        <ProductImageList primaryImage={mainImage} images={carouselImages}/>
    );
}
