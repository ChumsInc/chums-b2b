import React from 'react';
import {selectCurrentProduct, selectSelectedProduct} from "../selectors";
import DocumentTitle from "../../../components/DocumentTitle";
import Typography from "@mui/material/Typography";
import ProductAttributeStack from "./ProductAttrbuteStack";
import {useAppSelector} from "@/app/configureStore";

const ProductPageTitle = () => {
    const product = useAppSelector(selectCurrentProduct);
    const selectedProduct = useAppSelector(selectSelectedProduct);

    const isNew = (!!product?.season?.product_teaser && product?.season?.active)
        || (!!selectedProduct?.season?.product_teaser && selectedProduct?.season?.active)

    if (!product) {
        return null;
    }
    const documentTitle = product?.name + (product?.additionalData?.subtitle ? ` - ${product.additionalData.subtitle}` : '');
    return (
        <>
            <DocumentTitle documentTitle={documentTitle}/>
            <div className="product-title">
                <Typography component="h1" variant="h1">{product.name}</Typography>
                {!!product.additionalData?.subtitle && (
                    <Typography component="h2" variant="h2" sx={{fontSize: 24}}>
                        {product.additionalData.subtitle || ''}
                    </Typography>
                )}
                <ProductAttributeStack product={product} isNew={isNew} justifyContent="flex-start" sx={{mb: 2}}/>
            </div>
        </>
    )
}

export default ProductPageTitle;
