import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {useEffect} from "react";
import HomeBanner from "./HomeBanner";
import Stack from "@mui/material/Stack";
import {selectBannersList, selectBannersLoaded} from "@/ducks/banners/bannersSlice";
import {loadBanners} from "@/ducks/banners/actions";

const BannersList = () => {
    const dispatch = useAppDispatch();
    const banners = useAppSelector(selectBannersList);
    const loaded = useAppSelector(selectBannersLoaded);

    useEffect(() => {
        if (!loaded) {
            dispatch(loadBanners())
        }
    }, [loaded]);

    return (
        <Stack direction="column" spacing={2} sx={{mb: 2}}>
            {banners.map(banner => (<HomeBanner key={banner.id} banner={banner}/>))}
        </Stack>
    )
}

export default BannersList;
