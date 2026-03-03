import 'dotenv/config';
import _debug from 'debug';
import express, {type NextFunction, type Request, type  Response} from "express";
import favicon from "serve-favicon";
import path from "node:path";
import {getVersion, getVersionJS} from "./version";
import {getManifest} from "./manifest";
import {getAPIRequest, handleInvalidURL} from "./utils";
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from "helmet";
import * as crypto from "node:crypto";
import {helmetOptions} from "./helmetOptions";
import {useCookieGPCHelper} from "cookie-consent";
import {renderApp} from "./render";
import process from "node:process";
import rateLimit from "express-rate-limit";

const debug = _debug('chums:server:index');

const logUsage = (req: Request, _: Response, next: NextFunction) => {
    debug(req.ip, req.method, req.url);
    next();
}

const generalLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 50, // max 50 requests per minute,
    message: {error: 'Too many requests, please try again later.'}
})

const renderLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 25, // max 25 requests per minute,
    message: {error: 'Too many requests, please try again later.'}
})

const app = express();
app.set('trust proxy', 'loopback');
app.use((_: Request, res: Response, next: NextFunction) => {
    // must be before helmetOptions below
    res.locals.cspNonce = crypto.randomBytes(32).toString("hex");
    next();
})
app.use(helmet(helmetOptions))
app.set('json spaces', 2);
app.use(cookieParser(process.env.COOKIE_SECRET ?? undefined));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(favicon(path.join(process.cwd(), './public', 'favicon.ico')));
app.use(useCookieGPCHelper());
app.get('/chums.css.map', (_, res) => {
    res.redirect('/css/chums.css.map');
})
app.use('/assets', express.static('./dist-client/assets', {fallthrough: false}));
app.use('/css', express.static('./dist-server/css', {fallthrough: false}));
app.use('/js', express.static('./dist-server/js', {fallthrough: false}));
app.use('/build', express.static('./public/build', {fallthrough: false}));
app.get('/images', express.static('./public/images', {fallthrough: false}));
app.get('/files', express.static('./files', {fallthrough: false}));
app.get('/pdf', express.static('./pdf', {fallthrough: false}));

app.use(generalLimiter);
app.get('/manifest.json', getManifest);
app.get('/version.js', getVersionJS);
app.get('/version.json', getVersion);
app.get('/version', getVersion);
app.get('/api', getAPIRequest);

app.use(renderLimiter);
app.use(handleInvalidURL);
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

app.use((_, res) => {
    res.status(404).json({error: 'Not Found', status: 404});
})

app.listen(process.env.PORT, () => {
    debug('server running at localhost:' + process.env.PORT);
});

export default app;
