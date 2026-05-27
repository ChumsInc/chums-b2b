import Box, {type BoxProps} from "@mui/material/Box";
import {useAppSelector} from "@/app/hooks";
import {selectAllowsMarketing} from "@/ducks/cookie-consent";
import parse from "html-react-parser";
import {Element} from "domhandler";
import ContentSectionRequiresLogin from "@/components/pages/ContentSectionRequiresLogin.tsx";
import {selectLoggedIn} from "@/ducks/user/userProfileSlice.ts";

export interface HTMLContentProps extends BoxProps {
    html: string|null;
}

export default function HTMLContent({html, ...rest}: HTMLContentProps) {
    const allowsMarketing = useAppSelector(selectAllowsMarketing);
    const isLoggedIn = useAppSelector(selectLoggedIn);

    if (!html) {
        return null
    }

    const cleanHtml = html.replace(/(\r\n|\n|\r)/g, '');

    const parsed = parse(cleanHtml, {
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


    return (<Box {...rest}>{parsed}</Box>)
}
