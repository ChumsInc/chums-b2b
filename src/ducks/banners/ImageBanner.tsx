import React from 'react';
import {Banner} from "b2b-types";
import BannerLinkWrapper from "./BannerLinkWrapper";
import Box from "@mui/material/Box";
import {SxProps} from "@mui/system";
import Typography from "@mui/material/Typography";
import styled from "@emotion/styled";

const bannerImagePath = (filename: string) => `/images/chums/homepage/${filename.replace(/^\//, '')}`;
const StyledImg = styled.img`
    width: 100%;
    height: auto;
`

export default function ImageBanner({banner}: { banner: Banner }) {
    if (!banner.image || (!banner.image.desktop?.filename && !banner.image.mobile?.filename)) {
        return null;
    }

    const defaultSxProps: SxProps = {
        position: !!banner.image.desktop?.overlay || !!banner.image.mobile?.overlay ? 'relative' : undefined,
        height: 'fit-content',
    }

    const desktopSxProps: SxProps = {
        position: defaultSxProps.position === 'relative' ? 'absolute' : undefined,
        display: {xs: 'none', sm: 'block'},
        ...(banner.image.desktop?.overlaySxProps ?? {}),
    }

    const mobileSxProps: SxProps = {
        position: defaultSxProps.position === 'relative' ? 'absolute' : undefined,
        display: {xs: 'block', sm: 'none'},
        ...(banner.image.mobile?.overlaySxProps ?? {}),
    }


    const src = bannerImagePath(banner.image.desktop?.filename ?? banner.image.mobile?.filename ?? '');
    return (
        <BannerLinkWrapper banner={banner}>
            <Box sx={{...defaultSxProps, ...(banner.sxProps ?? {})}}>
                <picture>
                    {banner.image.mobile?.filename && (
                        <source media={`(max-width: ${banner.image.mobile?.width || 480}px)`}
                                width={banner.image.mobile?.width || 480}
                                height={banner.image.mobile?.height || 680}
                                srcSet={bannerImagePath(banner.image.mobile.filename)}/>)}
                    {banner.image.desktop?.filename && (
                        <source media={`(min-width: ${(banner.image.mobile?.width || 480) + 1}px)`}
                                width={banner.image.desktop?.width || 1600}
                                height={banner.image.desktop?.height || 500}
                                srcSet={bannerImagePath(banner.image.desktop.filename)}/>)}
                    <StyledImg src={src} alt={banner.image.desktop?.altText || banner.image.mobile?.altText || ''} />
                </picture>
                {banner.image.desktop?.overlay && (
                    <Typography variant="body1" sx={desktopSxProps}>
                        {banner.image.desktop?.overlay}
                    </Typography>
                )}
                {banner.image.mobile?.overlay && (
                    <Typography variant="body1" sx={mobileSxProps}>
                        {banner.image.mobile?.overlay}
                    </Typography>
                )}
            </Box>
        </BannerLinkWrapper>
    )
}
