import type {Menu} from "chums-types/b2b";
import {fetchJSON} from "./fetch";

export async function fetchMenu(id:number):Promise<Menu|null> {
    try {
        if (!id) {
            return null;
        }
        const url = '/api/menus/active/:id.json'.replace(':id', encodeURIComponent(id));
        const response = await fetchJSON<{menu: Menu}>(url, {cache: 'no-cache'});
        return response?.menu ?? null;
    } catch(err) {
        if (err instanceof Error) {
            console.debug("loadMenu()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadMenu()", err);
        return Promise.reject(new Error('Error in loadMenu()'));
    }
}
