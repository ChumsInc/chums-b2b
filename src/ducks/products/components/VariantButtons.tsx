import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentVariantProduct, selectProductVariantId} from "../selectors";
import {useAppDispatch} from "@app/configureStore";
import {setCurrentVariant} from "../actions";
import {ProductVariant} from "b2b-types";
import {isSellAsMix} from "../utils";
import VariantButton from "./VariantButton";
import Grid2 from "@mui/material/Unstable_Grid2";
import {sendGtagEvent} from "@api/gtag";


const activeVariants = (variants: ProductVariant[]): ProductVariant[] => {
    return variants.filter(v => v.product?.status).sort((a, b) => a.priority - b.priority);
}

export default function VariantButtons() {
    const dispatch = useAppDispatch();
    const selectedVariantId = useSelector(selectProductVariantId);
    const product = useSelector(selectCurrentVariantProduct);
    const [variants, setVariants] = useState(activeVariants(product?.variants ?? []));

    const selectHandler = useCallback((variant:ProductVariant) => {
        if (!variant || !variant.id || !product) {
            return;
        }
        if (variant.product && isSellAsMix(variant.product)) {
            sendGtagEvent('select_item', {
                item_list_id: product.itemCode,
                item_list_name: [product.name, product.additionalData?.subtitle].filter(val => !!val).join(' / '),
                items: [{
                    item_id: variant.product.itemCode,
                    item_name: `${variant.product.name}${variant.product.additionalData?.subtitle ? ' / ' + variant.product.additionalData?.subtitle : ''}`
                }]
            });
        } else {
            sendGtagEvent('select_content', {
                content_type: 'variant',
                content_id: variant.product?.itemCode ?? variant.id.toString()
            });
        }
        dispatch(setCurrentVariant(variant))
    }, [product])

    useEffect(() => {
        setVariants(activeVariants(product?.variants ?? []));
    }, [product]);


    if (variants.length <= 1) {
        return null;
    }

    return (
        <Grid2 container spacing={1} className="variant-buttons-container"
               direction={{xs: variants.length > 2 ? 'row' : 'column', sm: 'row'}}
               justifyContent={variants.length === 2 ? 'center' : 'flex-start'}>
            {variants
                .map(variant => (
                    <Grid2 key={variant.id} xs={variants.length > 2 ? 4 : 12} sm={3} md={4}>
                        <VariantButton onClick={selectHandler} variant={variant}
                                       direction={{xs: variants.length > 2 ? 'column' : 'row', sm: 'column'}}
                                       spacing={{xs: variants.length <= 2 ? 2 : 0, sm: 0}}
                                       selected={variant.id === selectedVariantId}/>
                    </Grid2>
                ))
            }
        </Grid2>
    );
}
