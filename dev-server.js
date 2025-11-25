import 'dotenv/config';
import express from 'express';
import favicon from "serve-favicon";
import path from "node:path";
import bodyParser from "body-parser";
import {useCookieGPCHelper} from "cookie-consent";
import Debug from "debug";
import {renderApp} from "./dist-server/server/render.js";
import cookieParser from "cookie-parser";
import proxy from 'express-http-proxy';
import process from "node:process";
import {getManifest} from "./dist-server/server/manifest.js";
import {getVersion, getVersionJS} from "./dist-server/server/version.js";

const debug = Debug('chums:server:index');
const debugAPI = Debug('chums:server:api');
const debugProxy = Debug('chums:server:proxy');

export const b2bServerProxy = () => proxy('http://localhost', {
    proxyReqPathResolver: (req) => {
        return `/api${req.originalUrl}`
    },
    proxyReqOptDecorator: (proxyReqOpts) => ({
        ...proxyReqOpts,
        auth: getIntranetAuth()
    }),
    limit: '10mb'
});

export const b2bProxy = () => proxy('https://b2b.chums.com', {
    proxyReqPathResolver: (req) => {
        return req.originalUrl
    },
    proxyReqOptDecorator: (proxyReqOpts) => ({
        ...proxyReqOpts,
        auth: getIntranetAuth()
    }),
    limit: '10mb'
});

debug(`
Required to run dev server:
    - .env file with valid values for API_CLIENT and API_SECRET
    - SSH connection to with C2S forwarding for port 3306
    - LocalProxy running script "npm run b2b"
`)
const app = express();
app.set('json spaces', 2);
app.use(cookieParser(process.env.COOKIE_SECRET ?? undefined));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(useCookieGPCHelper());
app.use(favicon(path.join(process.cwd(), './public', 'favicon.ico')));
app.use('/css', express.static('./dist-client/css', {fallthrough: false}));
app.use('/assets', express.static('./dist-client/assets', {fallthrough: false}));
app.use('/images', logProxyUsage, b2bProxy());
app.use('/files', logProxyUsage, b2bProxy());
app.use('/pdf', logProxyUsage, b2bProxy());
app.use('/b2b-swatches', logProxyUsage, b2bProxy());
app.use('/node_modules', express.static('./node_modules', {fallthrough: false}))
app.get('/manifest.json', getManifest);
app.get('/version.js', getVersionJS);
app.get('/version.json', getVersion);
app.get('/version', getVersion);
app.use('/api', logProxyUsage, b2bProxy());
app.use('/content', logProxyUsage, b2bProxy());

app.use(logUsage);

app.get('/products/:category/:keyword/:sku', renderApp);
app.get('/products/:category/:keyword', renderApp);
app.get('/products/:keyword', renderApp);
app.get('/products', renderApp);
app.get('/pages/:keyword', renderApp);
app.get('/pages', renderApp);
app.get('/*path.*ext', (_, res) => {
    res.status(404).json({error: 'Not Found', status: 404});
})
app.get('/*page', renderApp);
app.get('/', renderApp);

app.use((req, res) => {
    res.status(404).json({error: 'Not Found', status: 404});
})

app.listen(process.env.DEV_PORT, function (error) {
    if (error) {
        debug('app.listen', process.env.DEV_PORT, error);
    }
    debug('server running at localhost:' + process.env.DEV_PORT);
});

const redirect = express();
redirect.use(logAPIUsage)
redirect.use(b2bServerProxy());
redirect.listen(8081, function (error) {
    debugAPI('API listener running at localhost:8081', error || '');
});

function logUsage(req, res, next) {
    debug(req.ip, req.method, req.url);
    next();
}

function logAPIUsage(req, res, next, error = null) {
    debugAPI(req.ip, req.method, req.url, error);
    next();
}

function logProxyUsage(req, res, next, error = null) {
    debugProxy(req.ip, req.method, req.url, error);
    next();
}

function getIntranetAuth() {
    const apiClient = process.env.INTRANET_API_CLIENT ?? 'missing';
    const apiSecret = process.env.INTRANET_API_SECRET ?? 'unknown';
    if (!apiClient || !apiSecret || apiClient === 'missing' || apiSecret === 'unknown') {
        console.warn('\n\n\n*** Mising environment values. Please check for a valid .env file. ***\n\n\n');
        process.exit(1);
    }
    return `${apiClient}:${apiSecret}`;
}
