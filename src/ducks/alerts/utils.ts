import {type B2BContextAlert} from "./types";

export const alertSorter = (a: B2BContextAlert, b: B2BContextAlert): number => a.alertId - b.alertId;
