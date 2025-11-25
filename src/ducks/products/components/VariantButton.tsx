import {selectLoggedIn} from "../../user/userProfileSlice";
import type {ProductVariant} from "chums-types/b2b";
import Button from "@mui/material/Button";
import {styled} from '@mui/material/styles';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import type {ResponsiveStyleValue} from "@mui/system";
import {useAppSelector} from "@/app/hooks";
import {useEffect, useState} from "react";
import VariantButtonPrice from "@/ducks/products/components/VariantButtonPrice.tsx";


const VariantButtonBase = styled(Button)(() => ({
    width: '100%',
}));


const VariantButton = ({variant, selected, direction, spacing, onClick}: {
    variant: ProductVariant;
    selected: boolean;
    direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
    spacing?: ResponsiveStyleValue<number | string>;
    onClick: (variant: ProductVariant) => void;
}) => {
    const _loggedIn = useAppSelector(selectLoggedIn);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(_loggedIn);
    }, [_loggedIn]);

    if (!variant.product) {
        return null
    }

    return (
        <VariantButtonBase variant={selected ? 'contained' : 'outlined'}
                           onClick={() => onClick(variant)}>
            <Stack direction={direction ?? {xs: 'row', sm: 'column'}}
                   spacing={spacing ?? {xs: 2, sm: 0}} alignItems="center">
                <Box>
                    <Typography variant="variantButtonText">{variant.title}</Typography>
                </Box>
                <Box>
                    <VariantButtonPrice product={variant.product} loggedIn={loggedIn}/>
                </Box>
            </Stack>
        </VariantButtonBase>
    )
}

export default VariantButton
