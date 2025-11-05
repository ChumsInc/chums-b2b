import type {MenuItem} from "chums-types/b2b";
import {type ReactNode} from "react";

export interface MenuState {
    productMenu: Menu|null;
    items: MenuItem[]
    loading: boolean;
    loaded: boolean;
    isOpen: boolean;
}

export interface MenuElement {
    id: number|string;
    element: ReactNode|null;
    requireLogin?: boolean;
}
export interface MinimalMenuItem extends Pick<MenuItem, 'id'|'requireLogin'|'url'> {
    title: string|ReactNode|null;
    menu?: {
        items?: Omit<MinimalMenuItem, 'menu'>[]
    };
    id: number|string;
}
export type NavMenuItem = MinimalMenuItem | MenuElement;
