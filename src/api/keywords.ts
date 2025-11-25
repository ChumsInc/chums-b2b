import type {Keyword} from "chums-types/b2b";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";

export async function fetchKeywords():Promise<Keyword[]> {
    try {
        const url = '/api/keywords.json';
        const res = await fetchJSON<{result: Keyword[]}>(url, {cache: 'no-cache'});
        return res?.result ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchKeywords()", err.message);
            return Promise.reject(err);
        }
        debug("fetchKeywords()", err);
        return Promise.reject(new Error('Error in fetchKeywords()'));
    }
}
