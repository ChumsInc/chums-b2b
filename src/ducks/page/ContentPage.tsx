import {useEffect, useState} from 'react';
import DocumentTitle from "../../components/DocumentTitle";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectPageContent, selectPageHTML, selectPageLoaded, selectPageLoadingStatus} from "./selectors";
import {useParams} from "react-router";
import {loadPage} from "./actions";
import LinearProgress from "@mui/material/LinearProgress";
import ContentPage404 from "../../components/ContentPage404";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {selectLoggedIn} from "../user/userProfileSlice";
import Alert from "@mui/material/Alert";
import HTMLContent from "@/components/common/HTMLContent";

export default function ContentPage() {
    const dispatch = useAppDispatch();
    const _isLoggedIn = useAppSelector(selectLoggedIn);
    const content = useAppSelector(selectPageContent);
    const loading = useAppSelector(selectPageLoadingStatus);
    const loaded = useAppSelector(selectPageLoaded);
    const html = useAppSelector(selectPageHTML);
    const params = useParams<{ keyword: string }>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            <Typography component="h1" variant="h1" onClick={onReload}>{content?.title}</Typography>
            <Divider sx={{my: 3}}/>
            {loading === 'loading' && <LinearProgress variant="indeterminate"/>}
            {!!html && (
                <HTMLContent html={html} className="has-bootstrap"/>
            )}
        </div>
    )
}
