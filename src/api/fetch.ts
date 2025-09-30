/**
 * Created by steve on 8/24/2016.
 */
import {auth} from "./IntranetAuthService";
import B2BError from "../types/generic";
import {STORE_VERSION} from "@/constants/stores";
import 'isomorphic-fetch';
import 'whatwg-fetch'
import global from '@/app/global-window';
import {isLocalHost} from "@/utils/dev";
import {ga4Exception} from "@/src/ga4/generic";
import SessionStore from "@/utils/SessionStore";
import {canStoreAnalytics} from "@/ducks/cookie-consent/utils";


function getCredentials(): string | null {
    const token = auth.getToken();
    if (token) {
        return `Bearer ${token}`;
    }
    return null
}

async function handleJSONResponse<T = unknown>(res: Response, args?: unknown): Promise<T> {
    const componentStack = JSON.stringify({
        url: res.url,
        args: args ?? null
    })
    if (!res.ok) {
        const text = res.statusText ?? await res.text();
        if (/(401|403|504)/.test(res.status.toString())) {
            return Promise.reject(new B2BError(text, res.url, null, res.status));
        }
        await postErrors({message: `error: ${res.status}`, componentStack});
        return Promise.reject(new B2BError(text, res.url, null, res.status));
    }
    try {
        const json = await res.json();
        if (json.error) {
            await postErrors({message: json.error, componentStack});
            console.warn(json.error);
            return Promise.reject(new B2BError(json.error, res.url));
        }
        return json;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("handleJSONResponse()", err.message);
            return Promise.reject(err);
        }
        console.debug("handleJSONResponse()", err);
        return Promise.reject(new Error('Error in handleJSONResponse()'));
    }
}

export async function allowErrorResponseHandler<T = unknown>(res: Response): Promise<T> {
    try {
        return await res.json() as T;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("allowErrorResponseHandler()", err.message);
            return Promise.reject(err);
        }
        console.debug("allowErrorResponseHandler()", err);
        return Promise.reject(new Error('Error in allowErrorResponseHandler()'));
    }
}


export type ResponseHandler = <T = unknown>(res: Response) => Promise<T>;

export async function fetchJSON<T = unknown>(url: string, {
    headers,
    body,
    ...requestInit
}: RequestInit = {}, responseHandler?: ResponseHandler): Promise<T | null> {
    try {
        const options: RequestInit = {...requestInit};

        if (!options.method) {
            options.method = 'GET';
        }
        options.headers = new Headers(headers ?? undefined);

        if (!options.credentials || options.credentials === 'same-origin') {
            if (!options.credentials) {
                options.credentials = 'same-origin';
            }
            const credentials = getCredentials();
            if (credentials) {
                options.headers.append('Authorization', credentials);
            }
        }

        options.headers.append('Accept', 'application/json')
        if (!['HEAD', 'GET'].includes(options.method.toUpperCase())) {
            options.body = body;
            options.headers.append('Content-Type', 'application/json')
        }

        const res = await fetch(url, {...options});
        if (responseHandler) {
            return responseHandler(res);
        }
        return await handleJSONResponse<T>(res, options.body);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("fetchJSON()", err.message);
            return Promise.reject(err);
        }
        console.error("fetchJSON()", err);
        if (typeof err === 'string') {
            return Promise.reject(new Error(err));
        }
        return Promise.reject(err);
    }
}

export async function fetchHTML(url: string, options: RequestInit = {}): Promise<string | undefined> {
    try {
        options.headers = new Headers(options?.headers);
        if (!options.method) {
            options.method = 'GET';
        }
        const credentials = getCredentials();
        if (credentials) {
            options.headers.append('Authorization', credentials)
        }
        const res = await fetch(url, {...options});
        if (!res.ok) {
            const text = await res.text();
            return Promise.reject(new Error(text));
        }
        return await res.text();
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("fetchHTML()", err.message);
            return Promise.reject(err);
        }
        console.error("fetchHTML()", err)
        if (typeof err === 'string') {
            return Promise.reject(new Error(err));
        }
        return Promise.reject(err);
    }
}

export interface PostErrorsArg {
    message: string;
    componentStack?: string;
    userId?: number;
    fatal?: boolean;
}

export async function postErrors({message, componentStack, userId, fatal}: PostErrorsArg): Promise<void> {
    try {
        if (isLocalHost()) {
            return;
        }

        const version = SessionStore.getItem(STORE_VERSION, '-');
        const body = JSON.stringify({
            url: global.window.location.pathname,
            message,
            componentStack: componentStack ?? '',
            user_id: canStoreAnalytics() ?  (userId ?? 0) : 0,
            version,
        });
        await fetchJSON('/api/error-reporting', {method: 'POST', body}, allowErrorResponseHandler);
        ga4Exception('An error occurred', fatal ?? false);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("postErrors()", err.message);
            return Promise.reject(err);
        }
        console.error("postErrors()", err)
        if (typeof err === 'string') {
            return Promise.reject(new Error(err));
        }
        return Promise.reject(err);
    }
}
