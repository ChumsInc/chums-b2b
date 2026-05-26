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
import {useTitle} from "@/components/app/TitleContext.tsx";
import ContentPageSkeleton from "@/components/pages/ContentPageSkeleton.tsx";
import ContentRequiresLogin from "@/components/pages/ContentRequiresLogin.tsx";
import parse from 'html-react-parser';
import {Element} from "domhandler";
import ContentSectionRequiresLogin from "@/components/pages/ContentSectionRequiresLogin.tsx";
import {selectAllowsMarketing} from "@/ducks/cookie-consent";
import Box from "@mui/material/Box";

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
    const allowsMarketing = useAppSelector(selectAllowsMarketing);

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
            <ContentRequiresLogin keyword={content.keyword} title={content.title}/>
        )
    }

    const parsed = parse(html ?? '', {
        replace: (domNode) => {
            if (domNode instanceof Element && domNode.attribs && domNode.attribs['data-login-required']
                && !isLoggedIn) {
                // Replace login-required sections with a login-required message
                return (
                    <ContentSectionRequiresLogin/>
                )
            }
            if (!allowsMarketing) {
                // Replace YouTube iframes with non-cookie-blocking iframes
                if (domNode instanceof Element && domNode.name === 'iframe'
                    && domNode.attribs && domNode.attribs.src && domNode.attribs.src.includes('youtube.com')) {
                    return (
                        <iframe {...domNode.attribs}
                                src={domNode.attribs.src.replace('youtube.com', 'youtube-nocookie.com')}/>
                    )
                }
            }
            return domNode;
        }
    })


    return (
        <div className={`page-${content?.keyword}`}>
            <Typography component="h1" variant="h1" onClick={onReload}>{content?.title}</Typography>
            <Divider sx={{my: 3}}/>
            {loading === 'loading' && <LinearProgress variant="indeterminate"/>}
            <Box className="has-bootstrap">
                {parsed}
            </Box>
        </div>
    )
}
