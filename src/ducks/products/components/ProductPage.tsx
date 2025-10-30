import React, {useEffect, useRef, useState} from 'react';
import {loadProduct, setCurrentVariant} from '../actions';
import classNames from "classnames";
import SwatchSet from "./SwatchSet";
import AddToCartForm from "@/components/b2b-cart/add-to-cart/AddToCartForm";
import Alert from "@mui/material/Alert";
import CartItemDetail from "./CartItemDetail";
import {redirect, useLocation} from "react-router";
import MissingTaxScheduleAlert from "@/components/customer/billing/MissingTaxScheduleAlert.tsx";
import RequireLogin from "@/components/RequireLogin";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCurrentProduct, selectProductCartItem, selectProductLoading, selectSelectedProduct} from "../selectors";
import {selectCustomerAccount} from "../../customer/selectors";
import ProductPageImage from "./ProductPageImage";
import ProductPageTitle from "./ProductPageTitle";
import ProductPageInfo from "./ProductPageInfo";
import {isCartProduct, isProduct, isSellAsVariants} from "../utils";
import {isBillToCustomer} from "@/utils/typeguards";
import ProductPreSeasonAlert from "./ProductPreSeasonAlert";
import SelectCustomerAlert from "@/components/customer/SelectCustomerAlert.tsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import VariantButtons from "./VariantButtons";
import Collapse from "@mui/material/Collapse";
import {useIsSSR} from "@/hooks/is-server-side";
import {ga4ViewItem} from "@/utils/ga4/generic";
import HTMLContent from "@/components/common/HTMLContent.tsx";
import styled from "@emotion/styled";


const ProductPanel = styled.div`
    iframe {
        border: none;
        max-width: 100%;
        width: 100%;
        aspect-ratio: 16/9;
        height: auto;
    }
`

const ProductPage = ({keyword}: {
    keyword: string;
}) => {
    const isSSR = useIsSSR();
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectCurrentProduct);
    const selectedProduct = useAppSelector(selectSelectedProduct);
    const loading = useAppSelector(selectProductLoading);
    const cartItem = useAppSelector(selectProductCartItem);
    const customerAccount = useAppSelector(selectCustomerAccount);
    const location = useLocation();
    const [cartMessage, setCartMessage] = useState<string | null>(null);
    const timerHandle = useRef<number>(0);
    const [quantity, setQuantity] = useState<number>(1);


    useEffect(() => {
        dispatch(loadProduct(keyword));
    }, [keyword]);

    useEffect(() => {
        setQuantity(1);
        ga4ViewItem(product)
    }, [product])

    useEffect(() => {
        setQuantity(1);
    }, [selectedProduct?.salesUM]);

    useEffect(() => {
        setCartMessage(null);
    }, [cartItem]);

    useEffect(() => {
        if (isSSR) {
            return;
        }
        if (cartMessage) {
            timerHandle.current = window.setTimeout(() => {
                setCartMessage(null);
            }, 5000);
        }
        return () => {
            window.clearTimeout(timerHandle.current);
        }
    }, [isSSR, cartMessage]);


    useEffect(() => {
        if (location?.state?.variant
            && product
            && isSellAsVariants(product)
            && selectedProduct?.keyword !== location.state.variant) {
            const [_variant] = product.variants.filter(v => v.product?.keyword === location.state.variant);
            console.debug(location.state.variant, _variant.product?.keyword);
            if (_variant) {
                dispatch(setCurrentVariant(_variant));
            }
            delete location.state.variant;
            redirect(location.pathname);
        }
    }, [location, selectedProduct, product]);


    return (
        <Box className={classNames('product-page', {loading})}>
            <ProductPanel>
                <Grid container spacing={5}>
                    <Grid size={12} sx={{display: {xs: 'block', md: 'none'}}}>
                        <ProductPageTitle/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6, lg: 7}}>
                        <ProductPageImage/>
                    </Grid>
                    <Grid size={{xs: 12, md: 6, lg: 5}}>
                        <Box sx={{display: {xs: 'none', md: 'block'}}}>
                            <ProductPageTitle/>
                        </Box>

                        <ProductPageInfo/>
                        {isSellAsVariants(product) && (
                            <VariantButtons/>
                        )}

                        <SwatchSet/>
                        {(!isCartProduct(cartItem) || !cartItem.itemCode) && !loading && (
                            <Alert severity="info">
                                Please select a color
                            </Alert>
                        )}
                        {!!selectedProduct && !selectedProduct?.availableForSale && (
                            <Alert severity="warning">
                                <span><strong>{selectedProduct?.name}</strong> is not available for sale.</span>
                            </Alert>
                        )}
                        {!selectedProduct?.season && !!selectedProduct?.dateAvailable && (
                            <Alert severity="warning">{selectedProduct.dateAvailable}</Alert>
                        )}
                        <RequireLogin
                            fallback={(
                                <Alert severity="warning" title="">
                                    Please log in to see prices and availability
                                </Alert>
                            )}>
                            <SelectCustomerAlert/>
                        </RequireLogin>
                        <ProductPreSeasonAlert/>
                        <RequireLogin>
                            <MissingTaxScheduleAlert/>
                            {isProduct(selectedProduct) && isCartProduct(cartItem)
                                && isBillToCustomer(customerAccount) && selectedProduct.availableForSale && (
                                    <AddToCartForm quantity={quantity} cartItem={cartItem}
                                                   setActiveCart unitOfMeasure={cartItem.salesUM ?? 'EA'}
                                                   disabled={!customerAccount?.TaxSchedule}
                                                   onChangeQuantity={setQuantity} comment=""
                                                   afterAddToCart={setCartMessage}/>
                                )}
                            <Collapse in={!!cartMessage}>
                                <Alert severity="info" onClose={() => setCartMessage(null)}>{cartMessage}</Alert>
                            </Collapse>
                            <CartItemDetail cartItem={cartItem} msrp={[selectedProduct?.msrp]}/>
                        </RequireLogin>

                        <hr/>

                        {isProduct(product) && !!product.description && (
                            <div className="mt-3">
                                <HTMLContent html={product.description}/>
                            </div>
                        )}

                        {isProduct(product) && !!product.details && (
                            <div className="mt-3">
                                <h3>Features</h3>
                                <HTMLContent html={product.details}/>
                            </div>
                        )}

                    </Grid>
                </Grid>
            </ProductPanel>
        </Box>
    );
}
export default ProductPage;
