import React, {useEffect, useState} from 'react';
import {ProductAlternateImage} from "b2b-types";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import {waitForIt} from "../utils/general";
import ResponsiveProductImage from "./ResponsiveProductImage";

const sizes = `(max-width: 600px) 456px, (max-width: 900px) 755px, (max-width: 1200px) 559px, (max-width: 1536px) 755px, 800px`;


function ProductAlternateImageList({currentImage, images, onSelectImage}: {
    currentImage: ProductAlternateImage;
    images: ProductAlternateImage[];
    onSelectImage: (img:ProductAlternateImage) => void;
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

function ProductCurrentImage({image, show}:{
    image: ProductAlternateImage;
    show: boolean;
}) {
    return (
        <Box>
            <Fade in={show}>
                <Box>
                    <ResponsiveProductImage filename={image.image.replace(/\s/g, '%20')} alt={image.altText}
                                            loading="eager"
                                            sizes={sizes}
                                            width={800} height={800}/>
                </Box>
            </Fade>
        </Box>
    )
}

export interface ProductImageListProps {
    mainImage: ProductAlternateImage|null;
    alternateImages?: ProductAlternateImage[];
}

const ProductImageList = ({mainImage, alternateImages}: ProductImageListProps) => {
    const [image, setImage] = useState<ProductAlternateImage | null>(mainImage);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setImage(mainImage ?? null);
    }, [mainImage]);

    const onSelectImage = async (img: ProductAlternateImage) => {
        if (img.image !== image?.image) {
            setShow(false);
            await waitForIt(150);
            setImage(img);
            await waitForIt(150);
            setShow(true);
        }
    }

    if (!image) {
        return null;
    }

    if (!alternateImages || alternateImages.length === 0) {
        return (
            <ResponsiveProductImage filename={image.image.replace(/\s/g, '%20')} alt={image.altText} loading="eager"
                                    sizes={sizes}
                                    width={800} height={800}/>
        )
    }

    return (
        <Stack direction="row" spacing={2}>
            <ProductCurrentImage image={image} show={show} />
            <ProductAlternateImageList images={alternateImages} currentImage={image} onSelectImage={onSelectImage} />
            <link rel="preload" as="image" imageSrcSet={alternateImages.map(img => `/images/products/800/${img.image} 800w`).join(', ')} />
        </Stack>
    )
}

export default ProductImageList
