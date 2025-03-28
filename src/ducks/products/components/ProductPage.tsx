import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {loadProduct, setCurrentVariant} from '../actions';
import classNames from "classnames";
import SwatchSet from "./SwatchSet";
import AddToCartForm from "@/ducks/carts/components/add-to-cart/AddToCartForm";
import Alert from "@mui/material/Alert";
import CartItemDetail from "./CartItemDetail";
import {redirect, useLocation} from "react-router";
import MissingTaxScheduleAlert from "../../customer/components/MissingTaxScheduleAlert";
import RequireLogin from "@/components/RequireLogin";
import {useAppDispatch} from "@/app/configureStore";
import {selectCurrentProduct, selectProductCartItem, selectProductLoading, selectSelectedProduct} from "../selectors";
import {selectCustomerAccount} from "../../customer/selectors";
import ProductPageImage from "./ProductPageImage";
import ProductPageTitle from "./ProductPageTitle";
import ProductPageInfo from "./ProductPageInfo";
import {isCartProduct, isProduct, isSellAsVariants} from "../utils";
import {isBillToCustomer} from "@/utils/typeguards";
import ProductPreSeasonAlert from "./ProductPreSeasonAlert";
import SelectCustomerAlert from "../../customer/components/SelectCustomerAlert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import VariantButtons from "./VariantButtons";
import Collapse from "@mui/material/Collapse";
import {useIsSSR} from "@/hooks/is-server-side";
import {ga4ViewItem} from "@/src/ga4/generic";


const ProductPage = ({keyword}: {
    keyword: string;
}) => {
    const isSSR = useIsSSR();
    const dispatch = useAppDispatch();
    const product = useSelector(selectCurrentProduct);
    const selectedProduct = useSelector(selectSelectedProduct);
    const loading = useSelector(selectProductLoading);
    const cartItem = useSelector(selectProductCartItem);
    const customerAccount = useSelector(selectCustomerAccount);
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
    }, [cartMessage]);


    useEffect(() => {
        console.debug(location, selectedProduct?.keyword, product?.keyword);
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
            <div className="product-panel">
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
                                <div dangerouslySetInnerHTML={{__html: product.description}}/>
                            </div>
                        )}

                        {isProduct(product) && !!product.details && (
                            <div className="mt-3">
                                <h3>Features</h3>
                                <div dangerouslySetInnerHTML={{__html: product.details}}/>
                            </div>
                        )}

                    </Grid>
                </Grid>
            </div>
        </Box>
    );
}
export default ProductPage;
