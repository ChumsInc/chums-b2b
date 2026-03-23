import {useId} from 'react';
import type {CartProgress,} from "chums-types/b2b";
import {cartProgress} from "@/utils/cart";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";

const cartProgressLabels = ['Cart', 'Shipping & Delivery', 'Payment', 'Confirm Checkout'];

export interface CartCheckoutProgressProps {
    disabled?: boolean;
}

export default function CartCheckoutProgress({disabled}: CartCheckoutProgressProps) {
    const {progress, setProgress} = useCartCheckout()
    const id = useId();
    const cartSteps = 4;
    const progressValue = progress / (cartProgress.confirm + 1);
    const progressPercent = (progressValue * 100) + (100 / cartSteps / 2);
    const changeHandler = (next: CartProgress) => {
        if (!disabled) {
            setProgress(next);
        }
    }
    return (
        <Box sx={{width: '100%', mb: 1, mt: 2}}>
            <Box aria-label={`Checkout Progress: ${cartProgressLabels[progress]}`} id={id}>
                <LinearProgress variant="determinate" value={progressPercent} aria-labelledby={id}/>
            </Box>
            <Grid container spacing={1}>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button"
                            size="small"
                            disabled={disabled}
                            onClick={() => changeHandler(cartProgress.cart)}>Cart</Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || progress < cartProgress.delivery}
                            size="small"
                            onClick={() => changeHandler(cartProgress.delivery)}>
                        Shipping & Delivery
                    </Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || progress < cartProgress.payment}
                            size="small"
                            onClick={() => changeHandler(cartProgress.payment)}>
                        Payment
                    </Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || progress < cartProgress.confirm}
                            size="small"
                            onClick={() => changeHandler(cartProgress.confirm)}>
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
