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
    let image: string = productImage.replace(/\?/, colorCode ?? '');
    if (colorCode) {
        colorCode.split('').map(code => {
            image = image!.replace(/\*/, code);
        });
    }

    return image.replace(/\*/g, '').replace(/\s/g, '%20');
}
