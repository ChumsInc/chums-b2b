import React, {useCallback, useEffect, useState} from 'react';
import {selectCurrentVariantProduct, selectProductVariantId} from "../selectors";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {setCurrentVariant} from "../actions";
import type {ProductVariant} from "b2b-types";
import {isSellAsColors, isSellAsMix} from "../utils";
import VariantButton from "./VariantButton";
import Grid from "@mui/material/Grid";
import {ga4SelectMixItem, ga4SelectVariantItem} from "@/utils/ga4/generic";
import {useSearchParams} from "react-router";


const activeVariants = (variants: ProductVariant[]): ProductVariant[] => {
    return variants.filter(v => v.product?.status).sort((a, b) => a.priority - b.priority);
}

export default function VariantButtons() {
    const dispatch = useAppDispatch();
    const selectedVariantId = useAppSelector(selectProductVariantId);
    const product = useAppSelector(selectCurrentVariantProduct);
    const [variants, setVariants] = useState(activeVariants(product?.variants ?? []));
    const [params, setParams] = useSearchParams();

    useEffect(() => {
        const sku = params.get('sku');
        if (!!sku && product && product.itemCode !== sku) {
            let variant: ProductVariant;
            const matching = variants.filter(v => v.product?.itemCode === sku
                || (v.product && isSellAsColors(v.product) && v.product.items.filter(i => i.itemCode === sku).length > 0)
            );
            if (matching.length > 1) {
                [variant] = matching.filter(v => v.id === selectedVariantId);
            } else {
                variant = matching[0];
            }
            if (variant) {
                dispatch(setCurrentVariant({...variant, preferredItem: sku}));
                return;
            }
        }
    }, [params, product, variants]);

    const selectHandler = useCallback((variant: ProductVariant) => {
        if (!variant || !variant.id || !product) {
            return;
        }
        if (variant.product && isSellAsMix(variant.product)) {
            ga4SelectMixItem(product, variant.product);
        } else {
            ga4SelectVariantItem(variant.product?.itemCode ?? variant.id.toString())
        }
        const _params = new URLSearchParams(params)
        if (variant.product?.itemCode) {
            _params.set('sku', variant.product?.itemCode)
        } else {
            _params.delete('sku')
        }
        setParams(_params, {replace: true});
        dispatch(setCurrentVariant(variant))
    }, [product])

    useEffect(() => {
        setVariants(activeVariants(product?.variants ?? []));
    }, [product]);


    if (variants.length <= 1) {
        return null;
    }

    return (
        <Grid container spacing={1} className="variant-buttons-container"
              direction={{xs: variants.length > 2 ? 'row' : 'column', sm: 'row'}}
              justifyContent={variants.length === 2 ? 'center' : 'flex-start'}>
            {variants
                .map(variant => (
                    <Grid key={variant.id} size={{xs: variants.length > 2 ? 4 : 12, sm: 3, md: 4}}>
                        <VariantButton onClick={selectHandler} variant={variant}
                                       direction={{xs: variants.length > 2 ? 'column' : 'row', sm: 'column'}}
                                       spacing={{xs: variants.length <= 2 ? 2 : 0, sm: 0}}
                                       selected={variant.id === selectedVariantId}/>
                    </Grid>
                ))
            }
        </Grid>
    );
}
