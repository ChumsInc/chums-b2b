import {useLayoutEffect, useState} from "react";
import type {ProductAlternateImage} from "chums-types/b2b";
import Box from "@mui/material/Box";
import ResponsiveProductImage from "@/components/product-image/ResponsiveProductImage";
import {sizesQuery} from "@/components/product-image/utils";

export default function ProductCurrentImage({image}: {
    image: ProductAlternateImage;
}) {
    const [filename, setFilename] = useState<string>(image.image.replace(/\s/g, '%20'));

    useLayoutEffect(() => {
        setFilename(image.image.replace(/\s/g, '%20'));
    }, [image]);

    return (
        <Box>
            <ResponsiveProductImage filename={filename} alt={image.altText}
                                    loading="eager"
                                    sizes={sizesQuery}
                                    width={800} height={800}/>
        </Box>
    )
}
