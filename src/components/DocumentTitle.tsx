import React, {useEffect} from "react";

const DocumentTitle = ({documentTitle}: {
    documentTitle: string|null;
}) => {
    const [title, setTitle] = React.useState<string>(documentTitle ?? 'Chums B2B Dealer Website');

    useEffect(() => {
        setTitle(documentTitle ?? 'Chums B2B Dealer Website');
    }, [documentTitle]);

    return (
        <>
            <title>{[title, 'Chums B2B'].join(' | ')}</title>
            <meta property="og:title" content={[title, 'Chums B2B'].join(' | ')}/>
        </>
    )
}

export default DocumentTitle;
