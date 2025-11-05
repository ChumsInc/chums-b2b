import type {Banner} from "chums-types/b2b";

export const bannerSorter = (a:Banner, b:Banner) => ((a.priority ?? a.id) - (b.priority ?? b.id));
