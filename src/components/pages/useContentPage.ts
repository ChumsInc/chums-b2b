import ContentPageContext, {type ContentPageContextData} from "@/components/pages/ContentPageContext.tsx";
import {useContext} from "react";

export function useContentPage():ContentPageContextData {
    const context = useContext(ContentPageContext);
    if (!context) {
        throw new Error("useContentPage must be used within a ContentPageContextProvider");
    }
    return context;
}
