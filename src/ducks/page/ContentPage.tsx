import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import DocumentTitle from "../../components/DocumentTitle";
import {useAppDispatch} from "@/app/configureStore";
import {selectPageContent, selectPageLoaded, selectPageLoadingStatus} from "./selectors";
import {useParams} from "react-router";
import {loadPage} from "./actions";
import LinearProgress from "@mui/material/LinearProgress";
import ContentPage404 from "../../components/ContentPage404";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {selectLoggedIn} from "../user/selectors";
import Alert from "@mui/material/Alert";
import {fetchContent} from "@/api/page";

const ContentPage = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(selectLoggedIn);
    const content = useSelector(selectPageContent);
    const loading = useSelector(selectPageLoadingStatus);
    const loaded = useSelector(selectPageLoaded);
    const params = useParams<{ keyword: string }>();
    const [html, setHtml] = React.useState<string>('');

    const loadContent = useCallback( async () => {
        if (content?.filename) {
            const html = await fetchContent(content.filename);
            setHtml(html ?? '');
        }
    }, [content, loaded]);

    useEffect(() => {
        dispatch(loadPage(params.keyword))
    }, [params]);

    useEffect(() => {
        if (content?.content) {
            setHtml(content.content);
            return;
        }
        if (content?.filename) {
            loadContent()
                .catch((err:unknown) => {
                    if (err instanceof Error) {
                        setHtml(`<div>Error: ${err.message}</div>`);
                    }
                })
        }
    }, [content]);

    const documentTitle = `${loading === 'loading' ? 'Loading: ' : ''}${content?.title ?? params.keyword}`;

    if (!content) {
        if (loading === 'loading') {
            return (
                <div>
                    <DocumentTitle documentTitle={documentTitle}/>
                    <LinearProgress variant="indeterminate"/>
                </div>
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
                <DocumentTitle documentTitle={documentTitle}/>
                <Typography component="h1" variant="h1">{content?.title}</Typography>
                <Divider sx={{my: 3}}/>
                <ContentPage404/>
            </div>
        )
    }
    if (!isLoggedIn && content.requiresLogin) {
        return (
            <div className={`page-${content?.keyword}`}>
                <DocumentTitle documentTitle={documentTitle}/>
                <Typography component="h1" variant="h1">{content?.title}</Typography>
                <Divider sx={{my: 3}}/>
                <Alert severity="warning">Warning: This content requires login.</Alert>
            </div>
        )
    }

    return (
        <div className={`page-${content?.keyword}`}>
            <DocumentTitle documentTitle={documentTitle}/>
            <Typography component="h1" variant="h1" onClick={loadContent}>{content?.title}</Typography>
            <Divider sx={{my: 3}}/>
            {loading === 'loading' && <LinearProgress variant="indeterminate"/>}
            <div dangerouslySetInnerHTML={{__html: html}} className="has-bootstrap"/>
        </div>
    )
}

export default ContentPage;
