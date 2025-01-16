import {MenuItem} from "b2b-types";
import React from "react";

export interface MenuState {
    productMenu: Menu|null;
    items: MenuItem[]
    loading: boolean;
    loaded: boolean;
    isOpen: boolean;
}

export interface MenuElement {
    id: number|string;
    element: React.ReactNode|null;
    requireLogin?: boolean;
}
export interface MinimalMenuItem extends Pick<MenuItem, 'id'|'requireLogin'|'url'> {
    title: string|React.ReactNode|null;
    menu?: {
        items?: Omit<MinimalMenuItem, 'menu'>[]
    };
    id: number|string;
}
export type NavMenuItem = MinimalMenuItem | MenuElement;
