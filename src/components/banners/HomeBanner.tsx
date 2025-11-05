import type {Banner} from "chums-types/b2b";
import TextBanner from "./TextBanner";
import ImageBanner from "./ImageBanner";

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
