import {ContentPage} from "b2b-types";
import {fetchHTML, fetchJSON} from "./fetch";

export async function fetchPage(arg:string):Promise<ContentPage|null> {
    try {
        const url = `/api/pages/${encodeURIComponent(arg)}.json`;
        const response = await fetchJSON<{page: ContentPage}>(url, {cache: 'no-cache'});
        return response?.page ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchPage()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchPage()", err);
        return Promise.reject(new Error('Error in fetchPage()'));
    }
}

export async function fetchContent(arg:string):Promise<string|null> {
    try {
        const url = '/content/:filename'
            .replace(':filename', encodeURIComponent(arg));
        const res = await fetchHTML(url);
        return res ?? null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchContent()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchContent()", err);
        return Promise.reject(new Error('Error in fetchContent()'));
    }
}
