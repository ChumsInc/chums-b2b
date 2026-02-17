import {parseImageFilename2} from "@/components/common/image.ts";
import {apiPathCartImage} from "@/constants/api.ts";


export interface OrderItemImageProps {
    itemCode: string | null;
    itemCodeDesc: string | null;
    colorCode?: string | null;
    image?: string | null;
}

export default function OrderItemImage({itemCode, itemCodeDesc, colorCode, image}: OrderItemImageProps) {
    if (!itemCode) {
        return null;
    }
    let _image = image;
    if (!!_image && _image?.includes('?') && !!colorCode) {
        _image = parseImageFilename2({image: _image, colorCode})
    }
    const src = _image
        ? `/images/products/80/${encodeURIComponent(_image)}`
        : apiPathCartImage.replace(':ItemCode', encodeURIComponent(itemCode));
    return (<img src={src} alt={itemCodeDesc ?? undefined} className="img-thumbnail"/>)
};

