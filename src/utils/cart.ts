import type {CartProgress} from "chums-types/b2b";
import type {CartProgressList} from "@/types/cart/cart-utils";


export const cartProgress: CartProgressList = {
    cart: 0,
    delivery: 1,
    payment: 2,
    confirm: 3
}

export function nextCartProgress(progress: CartProgress): CartProgress {
    if (progress < cartProgress.confirm) {
        return progress + 1 as CartProgress
    }
    return progress;
}
