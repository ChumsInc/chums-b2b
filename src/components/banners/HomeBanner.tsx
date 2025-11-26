import type {Banner} from "chums-types/b2b";
import TextBanner from "./TextBanner";
import ImageBanner from "./ImageBanner";

export interface HomeBannerProps {
    banner: Banner;
    loading?: 'eager' | 'lazy'
}
const HomeBanner = ({banner, loading}:HomeBannerProps) => {
    if (banner.overlay && banner.overlay.innerText) {
        return <TextBanner banner={banner} />
    }

    if (banner.image) {
        return <ImageBanner banner={banner} loading={loading} />
    }

    return null;
}

export default HomeBanner
