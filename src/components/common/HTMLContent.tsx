import {useEffect, useState} from 'react'
import Box, {type BoxProps} from "@mui/material/Box";
import {useAppSelector} from "@/app/configureStore";
import {selectAllowsMarketing} from "@/ducks/cookie-consent";

interface FindReplace {
    find: string|RegExp;
    replace: string;
}

const replacements:FindReplace[] = [
    {find: /youtube\.com/g, replace: 'youtube-nocookie.com'},
];

export interface HTMLContentProps extends BoxProps {
    html: string;
}
export default function HTMLContent({html, ...rest}: HTMLContentProps) {
    const allowsMarketing = useAppSelector(selectAllowsMarketing);
    const [htmlContent, setHtmlContent] = useState<string>(html);

    useEffect(() => {
        if (!allowsMarketing) {
            let _html = html;
            replacements.forEach(({find, replace}) => _html = _html.replace(find, replace))
            setHtmlContent(_html);
            return;
        }
        setHtmlContent(html);
    }, [html, allowsMarketing]);
    if (!html) {
        return null
    }
    return <Box {...rest} dangerouslySetInnerHTML={{ __html: htmlContent }}  />
}
