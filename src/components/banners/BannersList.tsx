import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {useEffect} from "react";
import HomeBanner from "./HomeBanner.tsx";
import Stack from "@mui/material/Stack";
import {selectBannersList, selectBannersLoaded, selectBannersUpdated} from "@/ducks/banners/bannersSlice.ts";
import {loadBanners} from "@/ducks/banners/actions.ts";

const bannersMaxAge = 1000 * 60 * 30;

const BannersList = () => {
    const dispatch = useAppDispatch();
    const banners = useAppSelector(selectBannersList);
    const loaded = useAppSelector(selectBannersLoaded);
    const updated = useAppSelector(selectBannersUpdated);
    const now = new Date().valueOf();

    useEffect(() => {
        if (!loaded) {
            dispatch(loadBanners())
        }
    }, [loaded]);

    useEffect(() => {
        if (now - updated > bannersMaxAge) {
            dispatch(loadBanners())
        }
    }, [now, updated]);

    if (!banners.length) {
        return null;
    }

    return (
        <Stack direction="column" spacing={2} sx={{mb: 2}}>
            {banners.map(banner => (<HomeBanner key={banner.id} banner={banner} />))}
        </Stack>
    )
}

export default BannersList;
