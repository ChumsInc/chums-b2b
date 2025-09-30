import 'dotenv/config';
import Debug from 'debug';
import fs from "node:fs/promises";
import {NextFunction, Request, Response} from "express";
import {renderToString} from "react-dom/server";
import React from "react";
import {API_PORT} from "./config";
import {loadJSON, loadKeywords} from "./utils";
import {loadManifest} from "./manifest";
import B2BHtml from "./B2BHTML";
import {PreloadedState} from "b2b-types";
import {consentCookieName, HasUUID} from 'cookie-consent'
import {HasNonce} from "@/types/server";
import createServerSideStore from "@/app/server-side-store";

const debug = Debug('chums:server:render');

// Ensure these paths stay matched with /src/app/App.tsx routes
const validRoutes: RegExp = /^\/($|home|products|pages|set-password|signup|reset-password|login|logout|profile|account)/;

async function loadMainCSS(): Promise<string> {
    try {
        const file = await fs.readFile('./public/css/chums-b2b.css');
        return Buffer.from(file).toString();
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("loadMainCSS()", err.message);
            return Promise.reject(err);
        }
        return Promise.reject(new Error(err?.toString()));
    }
}

async function loadVersionNo(): Promise<string | null> {
    try {
        const file = await fs.readFile('./package.json');
        const packageJSON = Buffer.from(file).toString();
        const json = JSON.parse(packageJSON);
        return json?.version ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("loadVersionNo()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadVersionNo()", err);
        return Promise.reject(new Error('Error in loadVersionNo()'));
    }
}

async function getPreloadedState(req: Request, res: Response<unknown, HasNonce & HasUUID>): Promise<PreloadedState> {
    try {
        const params = new URLSearchParams();
        if (req.params.keyword) {
            params.set('keyword', req.params.keyword);
        }
        if (req.params.sku) {
            params.set('sku', req.params.sku);
        }
        if (req.query.sku && typeof req.query.sku === 'string') {
            params.set('sku', req.query.sku);
        }
        const cookieConsentUUID = req.signedCookies[consentCookieName] ?? res.locals.uuid ?? null;
        if (cookieConsentUUID) {
            params.set('uuid', cookieConsentUUID);
        }
        const nonce: string = res.locals.cspNonce!;
        const preload = await loadJSON<PreloadedState>(`http://localhost:${API_PORT}/preload/v2/state.json?${params.toString()}`);
        preload.version = {
            versionNo: await loadVersionNo(),
            lastChecked: new Date().valueOf(),
            ignored: null,
            changed: false,
            loading: false,
        }
        preload.app = {
            nonce: nonce,
        };
        return preload;
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("getPreloadedState()", err.message);
            return {};
        }
        debug("getPreloadedState()", err);
        return {};
    }
}

export async function renderApp(req: Request, res: Response<unknown, HasNonce & HasUUID>, next: NextFunction) {
    try {
        if (!validRoutes.test(req.path)) {
            debug('handleRender() invalid path => 404', req.path);
            next();
            return;
        }
        const keywords = await loadKeywords();
        if (req.params.keyword) {
            const keyword = keywords.find(kw => kw.keyword === req.params.keyword);
            if (!keyword?.status) {
                let redirect = '/';
                if (req.params.category) {
                    // if params.category is specified, then the url is for a product page, so redirect to the category page
                    const category = keywords.find(kw => kw.keyword === req.params.category);
                    if (category && category.status) {
                        redirect = `/products/${category.keyword}`;
                    }
                }
                res.redirect(redirect);
                return;
            }
            if (keyword?.redirect_to_parent) {
                // redirect to the parent page if required
                const redirect = keywords.find(kw => kw.id === keyword.redirect_to_parent && kw.pagetype === keyword.pagetype);
                if (redirect && redirect.status) {
                    res.redirect(`/products/${redirect.keyword}`);
                    return;
                }
            }
        }
        const manifestFiles = await loadManifest();
        const initialState = await getPreloadedState(req, res);
        const store = createServerSideStore(initialState)
        let swatchMTime = 0;

        try {
            const stat = await fs.stat("./public/b2b-swatches/swatches.css");
            swatchMTime = stat.mtimeMs ?? 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            //Do nothing here
        }

        const css = await loadMainCSS();
        const _html = renderToString(<B2BHtml url={req.url} css={css} store={store}
                                              cspNonce={res.locals.cspNonce}
                                              manifestFiles={manifestFiles}
                                              swatchTimestamp={swatchMTime.toString(36)}/>);
        const html = `<!DOCTYPE html>
                    ${_html}
                    `;
        res.send(html);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("renderApp()", err.message);
            console.trace(err.message);
            return res.json({error: err.message, name: err.name});
        }
        res.json({error: 'unknown error in renderApp'});
    }
}
