import {ProductAlternateImage} from "b2b-types";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ResponsiveProductImage from "@/components/product-image/ResponsiveProductImage";
import React from "react";

export default function ProductAlternateImageList({currentImage, images, onSelectImage}: {
    currentImage: ProductAlternateImage;
    images: ProductAlternateImage[];
    onSelectImage: (img: ProductAlternateImage) => void;
}) {
    return (
        <Stack direction="column" useFlexGap flexWrap="wrap" spacing={2} sx={{justifyContent: 'center'}}>
            {images
                .sort((a, b) => a.priority - b.priority)
                .map(img => (
                    <Paper key={img.id} elevation={currentImage.image === img.image ? 1 : 0}>
                        <Box sx={{width: '80px'}} onClick={() => onSelectImage(img)}>
                            <ResponsiveProductImage filename={img.image} preferredSize={80}
                                                    alt={img.altText}
                                                    loading="lazy"/>
                        </Box>
                    </Paper>
                ))}
        </Stack>
    )
}
