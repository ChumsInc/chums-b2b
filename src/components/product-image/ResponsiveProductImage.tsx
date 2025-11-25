import type {ImgHTMLAttributes} from 'react';
import {styled} from "@mui/material/styles";

const imageSizes: number[] = [80, 250, 400, 800, 2048];

export const ResponsiveImage = styled('img')`
    max-width: 100%;
    width: 100%;
    height: auto;
`

export interface ResponsiveProductImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    filename?: string;
    preferredSize?: number;
}

const ResponsiveProductImage = ({
                                    filename,
                                    preferredSize,
                                    src,
                                    alt,
                                    srcSet,
                                    sizes,
                                    ...rest
                                }: ResponsiveProductImageProps) => {
    const _filename = filename?.replace(/\s/g, '%20');
    let _src = src;
    let _srcSet = srcSet;
    if (!_src) {
        _src = `/images/products/${rest.width ?? 800}/${_filename}`;
    }
    if (!_srcSet) {
        const [nextSize = 2048] = imageSizes.filter(size => size >= (preferredSize ?? 2048));
        _srcSet = imageSizes
            .filter(size => size <= nextSize)
            .map(size => `/images/products/${size}/${_filename} ${size}w`).join(',')
    }
    return (
        <ResponsiveImage src={_src} alt={alt} srcSet={_srcSet} sizes={sizes}
                         width={preferredSize} height={preferredSize} {...rest}/>
    )
}

export default ResponsiveProductImage;
