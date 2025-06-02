import React, {useEffect} from "react";
import {selectCurrentProduct, selectSelectedProduct} from "../selectors";
import DocumentTitle from "../../../components/DocumentTitle";
import Typography from "@mui/material/Typography";
import ProductAttributeStack from "./ProductAttrbuteStack";
import {useAppSelector} from "@/app/configureStore";
import {Product} from "b2b-types";


function getProductTitle(product: Product|null):string {
    if (!product) {
        return '';
    }

    return product.name + (product.additionalData?.subtitle ? ` - ${product.additionalData.subtitle}` : '')
}

function getIsNew(product:Product|null, selectedProduct:Product|null):boolean {
    return (!!product?.season?.product_teaser && product?.season?.active)
        || (!!selectedProduct?.season?.product_teaser && selectedProduct?.season?.active)
}
const ProductPageTitle = () => {
    const product = useAppSelector(selectCurrentProduct);
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const [documentTitle, setDocumentTitle] = React.useState<string>(getProductTitle(product));
    const [isNew, setIsNew] = React.useState<boolean>(getIsNew(product, selectedProduct));

    useEffect(() => {
        setDocumentTitle(getProductTitle(product));
        setIsNew(getIsNew(product, selectedProduct));
    }, [product, selectedProduct]);


    if (!product) {
        return null;
    }

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
