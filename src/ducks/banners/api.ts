import type {Banner} from "chums-types/b2b";
import {fetchJSON} from "@/api/fetch";
import debug from "@/utils/debug.ts";

export async function fetchBanners():Promise<Banner[]> {
    try {
        const res = await fetchJSON<{banners: Banner[]}>('/api/features/banners/active.json');
        return res?.banners ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            debug("fetchBanners()", err.message);
            return Promise.reject(err);
        }
        debug("fetchBanners()", err);
        return Promise.reject(new Error('Error in fetchBanners()'));
    }
}
