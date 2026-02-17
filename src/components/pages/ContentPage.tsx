import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectPageContent, selectPageHTML, selectPageLoaded, selectPageLoadingStatus} from "@/ducks/page/selectors.ts";
import {useParams} from "react-router";
import {loadPage} from "@/ducks/page/actions.ts";
import LinearProgress from "@mui/material/LinearProgress";
import ContentPage404 from "../ContentPage404.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import Alert from "@mui/material/Alert";
import HTMLContent from "@/components/common/HTMLContent.tsx";
import {useTitle} from "@/components/app/TitleContext.tsx";
import ContentPageSkeleton from "@/components/pages/ContentPageSkeleton.tsx";

export default function ContentPage() {
    const dispatch = useAppDispatch();
    const _isLoggedIn = useAppSelector(selectLoggedIn);
    const content = useAppSelector(selectPageContent);
    const loading = useAppSelector(selectPageLoadingStatus);
    const loaded = useAppSelector(selectPageLoaded);
    const html = useAppSelector(selectPageHTML);
    const params = useParams<{ keyword: string }>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {setPageTitle} = useTitle()
    const documentTitle = `${loading === 'loading' ? 'Loading: ' : ''}${content?.title ?? params.keyword}`;

    useEffect(() => {
        setPageTitle({
            title: documentTitle,
        })
    }, [documentTitle]);

    useEffect(() => {
        setIsLoggedIn(_isLoggedIn);
    }, [_isLoggedIn]);

    useEffect(() => {
        dispatch(loadPage(params.keyword))
    }, [params]);

    const onReload = () => {
        if (content?.keyword) {
            dispatch(loadPage(content.keyword))
        }
    }


    if (!content) {
        if (loading === 'loading') {
            return (
                <ContentPageSkeleton/>
            )
        }
        if (loaded) {
            return (
                <ContentPage404/>
            )
        }
    }


    if (!content?.status) {
        return (
            <div className={`page-${content?.keyword}`}>
                <Typography component="h1" variant="h1">{content?.title}</Typography>
                <Divider sx={{my: 3}}/>
                <ContentPage404/>
            </div>
        )
    }
    if (!isLoggedIn && content.requiresLogin) {
        return (
            <div className={`page-${content?.keyword}`}>
                <Typography component="h1" variant="h1">{content?.title}</Typography>
                <Divider sx={{my: 3}}/>
                <Alert severity="warning">Warning: This content requires login.</Alert>
            </div>
        )
    }

    return (
        <div className={`page-${content?.keyword}`}>
            <Typography component="h1" variant="h1" onClick={onReload}>{content?.title}</Typography>
            <Divider sx={{my: 3}}/>
            {loading === 'loading' && <LinearProgress variant="indeterminate"/>}
            {!!html && (
                <HTMLContent html={html} className="has-bootstrap"/>
            )}
        </div>
    )
}
