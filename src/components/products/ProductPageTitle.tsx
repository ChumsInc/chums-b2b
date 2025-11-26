import {selectCurrentProduct, selectSelectedProduct} from "@/ducks/products/selectors.ts";
import Typography from "@mui/material/Typography";
import ProductAttributeStack from "./ProductAttrbuteStack.tsx";
import {useAppSelector} from "@/app/hooks.ts";
import {useTitle} from "@/components/app/TitleContext.tsx";
import {useEffect} from "react";

const ProductPageTitle = () => {
    const product = useAppSelector(selectCurrentProduct);
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const {setPageTitle} = useTitle();

    useEffect(() => {
        if (!product) {
            return;
        }
        const documentTitle = product.name + (product.additionalData?.subtitle ? ` - ${product.additionalData.subtitle}` : '');
        setPageTitle({
            title: documentTitle,
            description: product.description,
            image: {
                url: `/images/products/400/${product.image}`,
                alt: product.name
            },
            url: `/products/${product.defaultCategoryKeyword}/${product.keyword}`
        })
    }, [product]);

    const isNew = (!!product?.season?.product_teaser && product?.season?.active)
        || (!!selectedProduct?.season?.product_teaser && selectedProduct?.season?.active)

    if (!product) {
        return null;
    }
    return (
        <div className="product-title">
            <Typography component="h1" variant="h1">{product.name}</Typography>
            {!!product.additionalData?.subtitle && (
                <Typography component="h2" variant="h2" sx={{fontSize: 24}}>
                    {product.additionalData.subtitle || ''}
                </Typography>
            )}
            <ProductAttributeStack product={product} isNew={isNew} justifyContent="flex-start" sx={{mb: 2}}/>
        </div>
    )
}

export default ProductPageTitle;
