import {parseColor} from "@/utils/products";
import {ga4Exception} from "@/utils/ga4/generic";

export const parseImageFilename2 = ({image, colorCode}: {
    image: string;
    colorCode?: string | null;
}) => parseColor(image, colorCode ?? '');

export function parsePossiblyMissingFilename(productImage: string | null, colorCode?: string | null): string | null {
    if (!productImage) {
        return null;
    }
    return parseImageFilename(productImage, colorCode);
}

export function parseImageFilename(productImage: string, colorCode?: string | null): string {
    if (!productImage.trim()) {
        ga4Exception('Invalid product image', false);
        return 'missing-placeholder2.jpg';
    }

    if (!colorCode || !/[*?]/.test(productImage)) {
        return productImage.replace(/\s/g, '%20');
    }

    // this method is generally deprecated, but may still exist in some items
    // replaces * or ? wildcards in the image filename with a single digit or character of the color code string
    // for example:
    // image: '12115?.jpg', colorCode: '100' returns '12115100.jpg'
    // image: '12115**-**.jpg', colorCode: 'abcd' returns '12115ab-cd.jpg'

    let image: string = productImage.replace(/\?/, colorCode ?? '');

    if (colorCode && /[A-Z0-9]/i.test(colorCode)) {
        image = colorCode.split('').reduce((_img, code) => _img.replace(/\*/, code), image);
    }

    return image.replace(/\*/g, '').replace(/\s/g, '%20');
}
