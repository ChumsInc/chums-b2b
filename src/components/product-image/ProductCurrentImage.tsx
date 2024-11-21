import {ProductAlternateImage} from "b2b-types";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ResponsiveProductImage from "@components/product-image/ResponsiveProductImage";
import React from "react";
import {sizesQuery} from "@components/product-image/utils";

export default function ProductCurrentImage({image, show}: {
    image: ProductAlternateImage;
    show: boolean;
}) {
    return (
        <Box>
            <Fade in={show}>
                <Box>
                    <ResponsiveProductImage filename={image.image.replace(/\s/g, '%20')} alt={image.altText}
                                            loading="eager"
                                            sizes={sizesQuery}
                                            width={800} height={800}/>
                </Box>
            </Fade>
        </Box>
    )
}
