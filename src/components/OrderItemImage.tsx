import React from 'react';
import {parseImageFilename2} from "@/src/common/image";
export const API_PATH_CART_IMAGE = '/api/images/products/find/80/:ItemCode';


const OrderItemImage = ({itemCode, itemCodeDesc, colorCode, image}:{
    itemCode: string|null;
    itemCodeDesc: string|null;
    colorCode?: string|null;
    image?: string|null;
}) => {
    if (!itemCode) {
        return null;
    }
    if (!!image && image?.includes('?') && !!colorCode) {
        image = parseImageFilename2({image, colorCode})
    }
    const src = image
        ? `/images/products/80/${encodeURIComponent(image)}`
        : API_PATH_CART_IMAGE.replace(':ItemCode', encodeURIComponent(itemCode));
    return (<img src={src} alt={itemCodeDesc ?? undefined} className="img-thumbnail"/>)
};

export default OrderItemImage;
