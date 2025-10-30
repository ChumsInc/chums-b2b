import type {Banner} from "b2b-types";
import TextBanner from "./TextBanner.tsx";
import ImageBanner from "./ImageBanner.tsx";

export interface HomeBannerProps {
    banner: Banner;
}
const HomeBanner = ({banner}:HomeBannerProps) => {
    if (banner.overlay && banner.overlay.innerText) {
        return <TextBanner banner={banner} />
    }

    if (banner.image) {
        return <ImageBanner banner={banner} />
    }

    return null;
}

export default HomeBanner
