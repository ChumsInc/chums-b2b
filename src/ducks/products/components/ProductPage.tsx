import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {setCurrentVariant} from '../../../actions/products';
import classNames from "classnames";
import VariantSelector from "./VariantSelector";
import SwatchSet from "./SwatchSet";
import AddToCartForm from "../../cart/components/AddToCartForm";
import Alert from "../../../common-components/Alert";
import CartItemDetail from "./CartItemDetail";
import {noop} from '../../../utils/general';
import {Link, redirect} from "react-router-dom";
import MissingTaxScheduleAlert from "../../customer/components/MissingTaxScheduleAlert";
import RequireLogin from "../../../components/RequireLogin";
import {useAppDispatch} from "../../../app/configureStore";
import {selectLoggedIn} from "../../user/selectors";
import {
    selectCurrentProduct,
    selectProductCartItem,
    selectProductLoading,
    selectProductSeasonAvailable,
    selectProductSeasonCode,
    selectSelectedProduct
} from "../selectors";
import {selectCustomerAccount} from "../../customer/selectors";
import ProductPageImage from "./ProductPageImage";
import ProductPageTitle from "./ProductPageTitle";
import ProductPageInfo from "./ProductPageInfo";
import {isCartProduct, isProduct, isSellAsVariants} from "../utils";
import {useLocation} from "react-router";
import {isBillToCustomer} from "../../../utils/typeguards";
import ProductPreSeasonAlert from "./ProductPreSeasonAlert";
import {loadProduct, setCartItemQuantity} from "../actions";
import SelectCustomerAlert from "../../customer/components/SelectCustomerAlert";


const ProductPage = ({keyword}: {
    keyword: string;
}) => {
    const dispatch = useAppDispatch();
    const loggedIn = useSelector(selectLoggedIn);
    const product = useSelector(selectCurrentProduct);
    const selectedProduct = useSelector(selectSelectedProduct);
    const loading = useSelector(selectProductLoading);
    const cartItem = useSelector(selectProductCartItem);
    const customerAccount = useSelector(selectCustomerAccount);
    const season_code = useSelector(selectProductSeasonCode);
    const season_available = useSelector(selectProductSeasonAvailable);
    const location = useLocation();

    useEffect(() => {
        dispatch(loadProduct(keyword));
    }, [keyword]);

    useEffect(() => {
        if (location?.state?.variant
            && isSellAsVariants(product)
            && selectedProduct?.keyword !== location.state.variant) {
            const [_variant] = product.variants.filter(v => v.product?.keyword === location.state.variant);
            if (_variant) {
                dispatch(setCurrentVariant(_variant));
            }
            redirect(location.pathname);
        }
    }, [location?.state?.variant]);


    const onChangeQuantity = (quantity: number) => {
        dispatch(setCartItemQuantity(quantity));
    }

    const hasCustomer = !!customerAccount;

    return (
        <div className={classNames('product-page', {loading})}>
            <div className="product-panel">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-7">
                        <ProductPageImage/>
                    </div>
                    <div className="col-12 col-md-6 col-lg-5">
                        <ProductPageTitle/>

                        <ProductPageInfo/>
                        <VariantSelector/>
                        <SwatchSet/>
                        {!isCartProduct(cartItem) || !cartItem.itemCode && (
                            <Alert message="Please select an color" title=""/>
                        )}
                        {selectedProduct && !selectedProduct?.availableForSale && (
                            <Alert type="warning">
                                <span><strong>{selectedProduct?.name}</strong> is not available for sale.</span>
                            </Alert>
                        )}
                        {!!selectedProduct?.dateAvailable && (
                            <Alert type="warning">
                                <strong>{selectedProduct.dateAvailable}</strong>
                            </Alert>
                        )}
                        <RequireLogin>
                            <SelectCustomerAlert />
                        </RequireLogin>
                        {!loggedIn && (
                            <Alert type="warning" message="Please log in to see prices and availability"
                                   title=""/>
                        )}
                        <ProductPreSeasonAlert/>
                        <MissingTaxScheduleAlert/>
                        <RequireLogin>
                            <>
                                {isProduct(selectedProduct) && isCartProduct(cartItem)
                                    && isBillToCustomer(customerAccount) && selectedProduct.availableForSale && (
                                        <AddToCartForm quantity={cartItem?.quantity ?? 1} itemCode={cartItem.itemCode}
                                                       setGlobalCart
                                                       season_code={season_code} season_available={season_available}
                                                       disabled={!customerAccount?.TaxSchedule}
                                                       onChangeQuantity={onChangeQuantity} onDone={noop} comment=""/>
                                    )}

                                <CartItemDetail cartItem={cartItem} msrp={[selectedProduct?.msrp]}/>
                            </>
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

                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductPage;
