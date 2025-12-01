import type {CartProgress,} from "chums-types/b2b";
import {cartProgress} from "@/utils/cart";
import Button, {type ButtonProps} from "@mui/material/Button";

export interface CheckoutButtonProps extends ButtonProps {
    progress: CartProgress;
}

export default function CheckoutButton({progress, type, ...buttonProps}: CheckoutButtonProps) {
    const buttonText = () => {
        switch (progress) {
            case cartProgress.cart:
                return 'Begin Checkout';
            case cartProgress.delivery:
                return 'Confirm Delivery & Shipping';
            case cartProgress.payment:
                return 'Confirm Payment';
            default:
                return 'Submit Order';
        }
    }
    return (
        <Button type={type ?? 'button'} variant={progress === cartProgress.confirm ? 'contained' : "outlined"}
                {...buttonProps}>
            {buttonText()}
        </Button>
    )
}
