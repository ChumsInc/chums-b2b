import type {Slide} from "chums-types/b2b";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";


//reserved for future use?
export async function fetchSlides(): Promise<Slide[]> {
    try {
        const res = await fetchJSON<{ slides: Slide[] }>('/api/features/slides/active.json', {cache: 'no-cache'});
        return res?.slides ?? [];
    } catch (err) {
        if (err instanceof Error) {
            debug("fetchSlides()", err.message);
            return Promise.reject(err);
        }
        debug("fetchSlides()", err);
        return Promise.reject(new Error('Error in fetchSlides()'));
    }
}
