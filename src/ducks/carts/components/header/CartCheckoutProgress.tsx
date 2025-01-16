import React, {useId} from 'react';
import {
    CartProgress,
} from "@typeDefs/cart/cart-utils";
import {
    cartProgress_Cart,
    cartProgress_Confirm,
    cartProgress_Delivery,
    cartProgress_Payment
} from "@utils/cart";
import Box from "@mui/material/Box";
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid2'
import Button from '@mui/material/Button'


const cartProgressLabels = ['Cart', 'Shipping & Delivery', 'Payment', 'Confirm Checkout'];

export default function CartCheckoutProgress({current, disabled, onChange}: {
    current: CartProgress;
    disabled?: boolean;
    onChange: (next: CartProgress) => void;
}) {
    const id = useId();
    const levels = 4;
    const progress = current / (cartProgress_Confirm + 1);
    const value = (progress * 100) + (100 / levels / 2);
    const changeHandler = (next: CartProgress) => {
        if (!disabled) {
            onChange(next);
        }
    }
    return (
        <Box sx={{width: '100%', mb: 1, mt: 2}} >
            <Box aria-label={`Checkout Progress: ${cartProgressLabels[progress]}`} id={id}>
                <LinearProgress variant="determinate" value={value} aria-labelledby={id}/>
            </Box>
            <Grid container spacing={1}>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button"
                            size="small"
                            disabled={disabled}
                            onClick={() => changeHandler(cartProgress_Cart)}>Cart</Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || current < cartProgress_Delivery}
                            size="small"
                            onClick={() => changeHandler(cartProgress_Delivery)}>
                        Shipping & Delivery
                    </Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || current < cartProgress_Payment}
                            size="small"
                            onClick={() => changeHandler(cartProgress_Payment)}>
                        Payment
                    </Button>
                </Grid>
                <Grid size={3} sx={{textAlign: 'center'}}>
                    <Button type="button" disabled={disabled || current < cartProgress_Confirm}
                            size="small"
                            onClick={() => changeHandler(cartProgress_Confirm)}>
                        Confirm
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}
