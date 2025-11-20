import React from 'react';
import {selectProductCartItem, selectProductMSRP, selectProductSalesUM, selectSelectedProduct} from "../selectors";
import numeral from "numeral";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useAppSelector} from "@/app/hooks";

const ProductPageInfo = () => {
    const msrp = useAppSelector(selectProductMSRP);
    const salesUM = useAppSelector(selectProductSalesUM);
    const cartItem = useAppSelector(selectProductCartItem);
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const itemCode = cartItem?.itemCode ?? selectedProduct?.itemCode ?? null;

    return (
        <Stack direction="row" justifyContent="space-between">
            <Box>
                <Typography variant="caption" sx={{mr: 2}} component="span">SKU</Typography>
                <Typography variant="body1" component="span" sx={{fontWeight: '600'}}>{itemCode}</Typography>
            </Box>
            <Box>
                <Typography variant="caption" sx={{mr: 2}} component="span">MSRP</Typography>
                <Typography variant="body1" component="span" sx={{fontWeight: '600'}}>
                    $ {msrp.map(price => numeral(price).format('0.00')).join(' - ')}
                    {' '}
                    ({salesUM})
                </Typography>
            </Box>
        </Stack>
    )
}

export default ProductPageInfo;
