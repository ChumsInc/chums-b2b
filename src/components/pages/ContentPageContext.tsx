import type {ContentPage} from "chums-types/b2b";
import {createContext} from "react";

export interface ContentPageContextData {
    status: 'idle'|'loading'|'rejected';
    page: ContentPage|null;
    error: string|null;
    loadPage: (keyword:string, updateTitle?:boolean) => Promise<void>;
}

const ContentPageContext = createContext<ContentPageContextData|null>(null);
export default ContentPageContext;
