import type {PreloadedState} from "chums-types/b2b";
import type {Theme} from "@mui/material/styles";
import type {GtagFn} from "@/utils/ga4/types";


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

// if (typeof global.window !== 'undefined') {
//     if (!global.window?.__PRELOADED_STATE__) {
//         console.log('initiating global window preloaded state');
//         global.window.__PRELOADED_STATE__ = {};
//     }
// }

