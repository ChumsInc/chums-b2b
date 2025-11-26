import type {Banner, PreloadedState} from "chums-types/b2b";

export interface NavItemProps {
    inDrawer?: boolean;
}


export interface BannersStateV2a {
    entities: Record<number, Banner>;
    ids: number[];
    status: 'idle'|'loading'|'rejected';
    updated: number;
}
export interface PreloadedStateV2a extends Omit<PreloadedState, 'banners'>{
    banners?: BannersStateV2a
}
