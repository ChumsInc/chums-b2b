import {HelmetOptions} from "helmet";
import {IncomingMessage, ServerResponse} from "node:http";
import {Response} from "express";

export const helmetOptions:Readonly<HelmetOptions> = {
    contentSecurityPolicy: {
        directives: {
            "connect-src": [
                "'self'",
                "www.googletagmanager.com",
                "www.google-analytics.com",
                "accounts.google.com",
                "https://accounts.google.com/gsi/",
                "'unsafe-inline'",
                (_req: IncomingMessage, res: ServerResponse): string => `'nonce-${(res as Response).locals.cspNonce}'`,
            ],
            "script-src": [
                "'self'",
                "accounts.google.com",
                "https://accounts.google.com/gsi/client",
                "www.google-analytics.com",
                "www.googletagmanager.com",
                "'unsafe-inline'",
                (_req: IncomingMessage, res: ServerResponse): string => `'nonce-${(res as Response).locals.cspNonce}'`,
            ],
            "img-src": [
                "'self'",
                "b2b.chums.com",
                "*.chums.com",
                "www.googletagmanager.com",
                "*.googleusercontent.com",
                "'unsafe-inline'",
            ],
            "frame-src": [
                "'self'",
                "accounts.google.com",
                "https://accounts.google.com/gsi/",
                "https://www.youtube.com/",
                "https://youtu.be/",
                "'unsafe-inline'",
            ],
            "style-src": [
                "'self'",
                "b2b.chums.com",
                "*.chums.com",
                "https://accounts.google.com/gsi/style",
                "https://fonts.googleapis.com",
                "'unsafe-inline'",
            ],
            "font-src": [
                "'self'",
                "https://fonts.gstatic.com",
                "'unsafe-inline'",
            ],
            "default-src": [
                "'self'",
                "'unsafe-inline'",
            ],
        },
    },
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin',
    },
    crossOriginOpenerPolicy: {
        policy: 'same-origin-allow-popups',
    }
}
