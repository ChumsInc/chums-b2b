import {Menu} from "b2b-types";
import {fetchJSON} from "./fetch";

// generally loaded in Preloaded State, here in case we need to refresh.
export async function fetchProductMenu():Promise<Menu|null> {
    try {
        const url = '/api/menus/2.json';
        const res = await fetchJSON<{menus: Menu[]}>('/api/menus/2', {cache: 'no-cache'});
        return res?.menus[0] || null;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("loadProductMenu()", err.message);
            return Promise.reject(err);
        }
        console.debug("loadProductMenu()", err);
        return Promise.reject(new Error('Error in loadProductMenu()'));
    }
}

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
