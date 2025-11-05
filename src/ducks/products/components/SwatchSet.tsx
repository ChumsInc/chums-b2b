'use client';

import React, {useEffect, useState} from 'react';
import {SELL_AS_COLORS, SELL_AS_MIX} from "@/constants/product";
import Swatch from "./Swatch";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectProductCartItem, selectProductColorCode, selectSelectedProduct} from "../selectors";
import {setColorCode} from "../actions";
import type {ProductSwatchBase} from "chums-types/b2b";
import {isSellAsColors, isSellAsMix} from "../utils";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import {ga4SelectColorItem} from "@/utils/ga4/generic";
import {useSearchParams} from "react-router";

const SwatchContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    align-items: flex-start;
`

const SwatchSet = () => {
    const dispatch = useAppDispatch();
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const cartItem = useAppSelector(selectProductCartItem);
    const colorCode = useAppSelector(selectProductColorCode);
    const [params, setParams] = useSearchParams();
    const [items, setItems] = useState<(ProductSwatchBase[])>([]);
    const [swatchFormat, setSwatchFormat] = useState(selectedProduct?.additionalData?.swatch_format || '?')

    useEffect(() => {
        const sku = params.get('sku');
        if (sku && isSellAsColors(selectedProduct) && cartItem?.itemCode !== sku) {
            if (cartItem && sku !== cartItem.itemCode) {
                setParams((prev) => {
                    prev.set('sku', cartItem.itemCode)
                    return prev;
                }, {replace: true});
            }
        }
    }, [params, selectedProduct, cartItem]);

    useEffect(() => {
        if (!selectedProduct) {
            return;
        }
        setSwatchFormat(selectedProduct?.additionalData?.swatch_format || '?');
        if (isSellAsMix(selectedProduct)) {
            setItems(selectedProduct.mix.items);
        } else if (isSellAsColors(selectedProduct)) {
            setItems(selectedProduct.items.filter(item => item.status));
        } else {
            setItems([]);
        }
    }, [selectedProduct])

    useEffect(() => {
        ga4SelectColorItem(selectedProduct, cartItem);
    }, [selectedProduct, cartItem]);

    const clickHandler = (colorCode: string | null) => {
        if (colorCode) {
            dispatch(setColorCode(colorCode));
        }
    }

    if (!selectedProduct || !items.length) {
        return null;
    }

    return (
        <>
            <Box>
                <Typography variant="body1" sx={{mr: 3, display: 'inline-block'}}>
                    {selectedProduct.sellAs === SELL_AS_MIX && (<span>Selected Color:</span>)}
                    {selectedProduct.sellAs === SELL_AS_COLORS && (<span>Color:</span>)}
                </Typography>
                <Typography variant="body1"
                            sx={{fontWeight: 700, display: 'inline-block'}}>{cartItem?.colorName}</Typography>
            </Box>
            <SwatchContainer>
                {items
                    .map(item => (
                        <Swatch key={item.id} color={item.color ?? null}
                                itemQuantity={item.itemQuantity}
                                swatchFormat={item?.additionalData?.swatch_code || swatchFormat}
                                active={colorCode === item.color?.code}
                                newColor={item.additionalData?.season?.active}
                                onClick={clickHandler}/>
                    ))}
            </SwatchContainer>
        </>
    )

}

export default SwatchSet
