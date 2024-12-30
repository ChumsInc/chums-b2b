import React from "react";

const DocumentTitle = ({documentTitle = ''}: {
    documentTitle: string;
}) => {

    return (
        <>
            <title>{[documentTitle, 'Chums B2B'].join(' | ')}</title>
            <meta property="og:title" content={[documentTitle, 'Chums B2B'].join(' | ')}/>
        </>
    )
}

export default DocumentTitle;
