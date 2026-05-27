import {useAppSelector} from "@/app/hooks.ts";
import LinearProgress from "@mui/material/LinearProgress";
import ContentPage404 from "../ContentPage404.tsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";
import ContentPageSkeleton from "@/components/pages/ContentPageSkeleton.tsx";
import ContentRequiresLogin from "@/components/pages/ContentRequiresLogin.tsx";
import parse from 'html-react-parser';
import {Element} from "domhandler";
import ContentSectionRequiresLogin from "@/components/pages/ContentSectionRequiresLogin.tsx";
import {selectAllowsMarketing} from "@/ducks/cookie-consent";
import Box from "@mui/material/Box";
import {useContentPage} from "@/components/pages/useContentPage.ts";
import Alert from "@mui/material/Alert";

export default function ContentPage() {
    const {page, status, error} = useContentPage();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const allowsMarketing = useAppSelector(selectAllowsMarketing);

    if (!page) {
        if (status === 'loading') {
            return (
                <ContentPageSkeleton/>
            )
        }
    }


    if (!page?.status) {
        return (
            <div className={`page-${page?.keyword}`}>
                <Typography component="h1" variant="h1">{page?.title}</Typography>
                <Divider sx={{my: 3}}/>
                <ContentPage404/>
            </div>
        )
    }

    if (!isLoggedIn && page.requiresLogin) {
        return (
            <ContentRequiresLogin keyword={page.keyword} title={page.title}/>
        )
    }

    const parsed = parse(page.content ?? '', {
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
        <div className={`page-${page?.keyword}`}>
            <Typography component="h1" variant="h1">{page?.title}</Typography>
            <Divider sx={{my: 3}}/>
            {status === 'loading' && <LinearProgress variant="indeterminate"/>}
            {error && <Alert color="error">{error}</Alert>}
            <Box className="has-bootstrap">
                {parsed}
            </Box>
        </div>
    )
}
