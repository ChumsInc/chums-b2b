import * as process from "node:process";
import type {EnhancedStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import {StaticRouter} from "react-router";
import type {CookieConsentState, PreloadedState} from "chums-types/b2b";
import type {ManifestFiles} from "./manifest";
import App from "@/app/App.tsx";


const inlineJSHeadContent = (versionNo: string) => {
    return `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', '${process.env.GOOGLE_TAG_ID}');
        
        window.Chums = {"version": "${versionNo}", "gtagID": "${process.env.GOOGLE_TAG_ID}"};
        `;
}

export interface B2BHtmlProps {
    url: string;
    css: string;
    store: EnhancedStore
    manifestFiles: ManifestFiles;
    swatchTimestamp?: string;
    cspNonce: string;
}

export default function B2BHtml({url, css, store, manifestFiles, swatchTimestamp, cspNonce}: B2BHtmlProps) {
    const state: PreloadedState = store.getState();
    const preloadedStateJSON = JSON.stringify(state).replace(/</g, '\\u003c');
    return (
        <html lang="en-us" dir="ltr">
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="x-ua-compatible" content="ie-edge"/>
            <meta name="description" content="Chums B2B"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Chums B2B</title>
            <meta property="og:image" content="https://b2b.chums.com/images/logos/Chums-Logo-Badge-Red-RGB.png"/>
            <meta property="og:image:alt" content="Chums Logo"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://b2b.chums.com/"/>
            <link rel="apple-touch-icon" sizes="57x57" href="/images/icons/apple-touch-icon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/images/icons/apple-touch-icon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/images/icons/apple-touch-icon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/images/icons/apple-touch-icon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/images/icons/apple-touch-icon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/images/icons/apple-touch-icon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/images/icons/apple-touch-icon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/images/icons/apple-touch-icon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon-180x180.png"/>

            <style dangerouslySetInnerHTML={{__html: css}} nonce={cspNonce}/>
            <link rel="stylesheet" href={`/b2b-swatches/swatches.css?version=${swatchTimestamp}`}
                  nonce={cspNonce}/>
            <link rel="stylesheet" href="/css/has-bootstrap.css" nonce={cspNonce}/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
                nonce={cspNonce}
                rel="stylesheet"/>
            <script src="https://accounts.google.com/gsi/client" async defer nonce={cspNonce}/>
            <AnalyticsScripts nonce={cspNonce} consent={state.cookieConsent} versionNo={manifestFiles.version ?? ''} />
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
            {!!manifestFiles.index && (
                <link rel="modulepreload" href={`/${manifestFiles.index}`} nonce={cspNonce}/>

            )}
            {manifestFiles.imports.map(file => (
                <link rel="modulepreload" key={file} href={`/${file}`} nonce={cspNonce}/>
            ))}
        </head>
        <body>
        <div id="root">
            <Provider store={store}>
                <StaticRouter location={url}>
                    <App/>
                </StaticRouter>
            </Provider>
        </div>
        <script dangerouslySetInnerHTML={{__html: `window.__PRELOADED_STATE__ = ${preloadedStateJSON}`}}
                nonce={cspNonce}/>
        {!!manifestFiles.index && (
            <script type="module" src={`/${manifestFiles.index}`} nonce={cspNonce}/>
        )}
        {manifestFiles.imports.map(file => (
            <script type="module" key={file} src={`/${file}`} nonce={cspNonce}/>
        ))}
        </body>
        </html>
    )
}

interface AnalyticsScriptsProps {
    nonce: string;
    consent: CookieConsentState | undefined;
    versionNo: string;
}
function AnalyticsScripts({nonce, consent, versionNo}: AnalyticsScriptsProps) {
    if (!consent?.record?.preferences?.analytics) {
        return null;
    }
    return (
        <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_TAG_ID}`}
                    nonce={nonce}/>
            <script dangerouslySetInnerHTML={{__html: inlineJSHeadContent(versionNo)}}
                    nonce={nonce}/>
        </>
    )
}
