import {PreloadedState} from "../types/preload";
import {Theme} from "@mui/material/styles";
import {GtagFn} from "@/src/ga4/types";


declare global {
    interface Window {
        __PRELOADED_STATE__?: PreloadedState;
        gtag?: GtagFn;
        dataLayer?: Record<string, unknown>[]
        theme?: Theme;
        Chums?: {
            version?: string;
            gtagID?: string;
        }
    }
}

if (typeof global.window !== 'undefined') {
    if (!global.window?.__PRELOADED_STATE__) {
        console.log('initiating global window preloaded state');
        global.window.__PRELOADED_STATE__ = {};
    }
}

export default global;
