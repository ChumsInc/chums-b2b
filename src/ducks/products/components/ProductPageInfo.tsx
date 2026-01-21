import React from 'react';
import {useSelector} from "react-redux";
import {selectProductCartItem, selectProductMSRP, selectProductSalesUM, selectSelectedProduct} from "../selectors";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductPrice from "@/ducks/products/components/ProductPrice";

const ProductPageInfo = () => {
    const msrp = useSelector(selectProductMSRP);
    const salesUM = useSelector(selectProductSalesUM);
    const cartItem = useSelector(selectProductCartItem);
    const selectedProduct = useSelector(selectSelectedProduct);
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
                    <ProductPrice prices={msrp} salesUM={salesUM}/>
                </Typography>
            </Box>
        </Stack>
    )
}

export default ProductPageInfo;
