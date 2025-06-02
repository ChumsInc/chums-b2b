import "dotenv/config";
import Debug from "debug";
import fs from "node:fs/promises";
import {NextFunction, Request, Response} from "express";
import {rootReducer} from "@/app/configureStore";
import {renderToString} from "react-dom/server";
import {Provider} from "react-redux";
import App from "@/app/App";
import React from "react";
import prepState from "@/app/preloaded-state";
import {API_PORT} from "./config";
import {loadJSON, loadKeywords} from "./utils";
import {loadManifest} from "./manifest";
import B2BHtml from "./B2BHTML";
import {StaticRouter} from "react-router";
import {configureStore} from "@reduxjs/toolkit";
import {PreloadedState} from "@/types/preload";
import {Keyword} from "b2b-types";

const debug = Debug('chums:server:render');

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

const redirectToParent = (res: Response, found: Keyword, keywords: Keyword[]): void => {
    const [parent] = keywords.filter(kw => kw.status).filter(kw => kw.id === found.redirect_to_parent);
    if (!parent || !parent.status) {
        res.redirect('/products/all');
        return;
    }
    res.redirect(`/products/${parent.keyword}`);
}

export async function renderApp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (!/^\/($|home|login|logout|signup|pages|profile|account|orders|invoices|set-password|reset-password)/.test(req.path)) {
            debug('handleRender() invalid path => 404', req.path);
            next();
            return;
        }
        await renderHandler(req, res);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("renderApp()", err.message);
            console.trace(err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in renderApp'});
    }
}

export async function renderAppProductPage(req: Request, res: Response): Promise<void> {
    try {
        const searchParams = new URLSearchParams();
        const keywords = await loadKeywords();
        if (req.params.product) {
            const [found] = keywords.filter(kw => kw.pagetype === 'product')
                .filter(kw => kw.keyword === req.params.product);
            if (!found || !found.status) {
                res.redirect(`/products/${req.params.category}`);
                return;
            }
            if (found?.redirect_to_parent) {
                redirectToParent(res, found, keywords);
                return;
            }
            searchParams.set('product', found.keyword);
        } else if (req.params.category) {
            const [found] = keywords.filter(kw => kw.pagetype === 'product' || kw.pagetype === 'category')
                .filter(kw => kw.keyword === req.params.category);
            if (!found) {
                res.redirect(`/products/all`);
                return;
            }
            if (found?.redirect_to_parent) {
                redirectToParent(res, found, keywords);
                return;
            }
            searchParams.set('category', found.keyword);
        }
        await renderHandler(req, res, searchParams);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("renderAppProductPage()", err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in renderAppProductPage'});
    }
}

export async function renderAppContentPage(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const searchParams = new URLSearchParams();
        const keywords = await loadKeywords();
        if (req.params.keyword) {
            const [found] = keywords.filter(kw => kw.pagetype === 'page')
                .filter(kw => kw.keyword === req.params.keyword);
            if (!found || (!found.status && !found.redirect_to_parent)) {
                next();
                return;
            }
            if (found.redirect_to_parent) {
                const [parent] = keywords.filter(kw => kw.status).filter(kw => kw.id === found.redirect_to_parent);
                if (!parent || !parent.status) {
                    next();
                }
                res.redirect(`/products/${parent.keyword}`);
                return;
            }
            searchParams.set('page', found.keyword);
        }
        await renderHandler(req, res, searchParams);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("renderAppContentPage()", err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in renderAppContentPage'});
    }
}


async function renderHandler(req: Request, res: Response, searchParams?: URLSearchParams | undefined): Promise<void> {
    try {
        const nonce: string = res.locals.cspNonce!;
        const manifestFiles = await loadManifest();
        const preload = await loadJSON<PreloadedState>(`http://localhost:${API_PORT}/preload/state.json?${searchParams?.toString()}`);
        if (!preload.version) {
            const versionNo = await loadVersionNo();
            preload.version = {versionNo}
        }

        const initialState = prepState(preload ?? {});
        initialState.app.nonce = nonce;
        const store = configureStore({reducer: rootReducer, preloadedState: initialState});
        const app = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <App/>
                </StaticRouter>
            </Provider>
        );

        let swatchMTime = 0;
        try {
            const stat = await fs.stat("./public/b2b-swatches/swatches.css");
            swatchMTime = stat.mtimeMs ?? 0;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: unknown) {
            //Do nothing here
        }

        const css = await loadMainCSS();
        const _html = renderToString(<B2BHtml html={app} css={css} state={store.getState()}
                                              cspNonce={res.locals.cspNonce}
                                              manifestFiles={manifestFiles}
                                              swatchTimestamp={swatchMTime.toString(36)}/>);
        const html = `<!DOCTYPE html>
                    ${_html}
                    `;
        res.send(html);
    } catch (err: unknown) {
        if (err instanceof Error) {
            debug("render()", err.message);
            res.json({error: err.message, name: err.name});
            return;
        }
        res.json({error: 'unknown error in render'});
    }
}
