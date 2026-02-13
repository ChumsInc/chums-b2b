import {documentTitles} from "@/constants/paths.ts";
import BannersList from "../banners/BannersList.tsx";
import Typography from "@mui/material/Typography";
import {useTitle} from "@/components/app/TitleContext.tsx";
import {useEffect} from "react";

export default function Home() {
    const {setPageTitle} = useTitle();

    useEffect(() => {
        setPageTitle({
            title: documentTitles.home,
            description: 'Chums Business-to-Business Website'
        })
    }, []);

    return (
        <div>
            <Typography component="h1" variant="h1" sx={{textAlign: 'center', mb: 3}}>
                Chums Business-to-Business Website
            </Typography>
            <BannersList/>
        </div>
    )
}

