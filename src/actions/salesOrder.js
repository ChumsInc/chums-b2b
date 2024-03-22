import {
    FETCH_FAILURE,
    FETCH_INIT,
    FETCH_ORDERS,
    FETCH_SALES_ORDER,
    FETCH_SUCCESS,
    SAVE_CART,
    SEND_ORDER_EMAIL_ACK,
    SET_CART,
} from "../constants/actions";
import {fetchGET, fetchPOST} from "../utils/fetch";
import {API_PATH_OPEN_ORDERS, CART_ACTIONS} from "../constants/paths";
import {customerSlug, isValidCustomer, sageCompanyCode} from "../utils/customer";
import {handleError} from "../ducks/app/actions";
import {setAlert} from "../ducks/alerts/actions";
import {isCartOrder} from "../utils/orders";
import localStore from "../utils/LocalStore";
import {STORE_CURRENT_CART} from "../constants/stores";
import {customerFromState, setCurrentCart} from "../ducks/cart/actions";
import {NEW_CART} from "../constants/orders";
import {selectCustomerAccount} from "../ducks/customer/selectors";
import {fetchSalesOrder} from "../api/sales-order";
import {selectCartNo} from "../ducks/cart/selectors";
import {selectSalesOrderProcessing} from "../ducks/salesOrder/selectors";
import {generatePath, redirect} from "react-router-dom";


export const fetchOpenOrders = ({ARDivisionNo, CustomerNo}) => (dispatch, getState) => {
    const Company = 'chums';
    const {user} = getState();
    if (!user.loggedIn) {
        return;
    }
    if (!isValidCustomer({Company, ARDivisionNo, CustomerNo})) {
        return;
    }
    const url = API_PATH_OPEN_ORDERS
        .replace(':Company', encodeURIComponent(sageCompanyCode(Company)))
        .replace(':ARDivisionNo', encodeURIComponent(ARDivisionNo))
        .replace(':CustomerNo', encodeURIComponent(CustomerNo));
    dispatch({type: FETCH_ORDERS, status: FETCH_INIT});
    return fetchGET(url, {cache: 'no-cache'})
        .then(res => {
            const {result} = res;
            const state = getState();
            const {cartNo} = state.cart;
            const {salesOrderNo} = state.salesOrder;
            dispatch({type: FETCH_ORDERS, status: FETCH_SUCCESS, orders: result, cartNo, salesOrderNo});
            const carts = result
                .filter(so => isCartOrder(so));
            const [cart] = carts.filter(so => cartNo === '' || so.SalesOrderNo === cartNo);
            if (cart) {
                dispatch(setCurrentCart(cart));
            }
        })
        .catch(err => {
            console.log('fetchOpenOrders()', err.message);
            // if (err.name === AUTH_ERROR || err.message === AUTH_FAILED) {
            //     dispatch(setLoggedIn({loggedIn: false}));
            // }
            dispatch(handleError(err, FETCH_ORDERS));
            dispatch({type: FETCH_ORDERS, status: FETCH_FAILURE});
        });
};

/**
 *
 * @param {string} SalesOrderNo
 * @return {(function(*, *): Promise<void>)|*}
 */
export const loadSalesOrder = (SalesOrderNo) => async (dispatch, getState) => {
    if (!SalesOrderNo || SalesOrderNo === NEW_CART) {
        return;
    }
    const state = getState();
    const customerAccount = selectCustomerAccount(state);
    const cartNo = selectCartNo(state);
    const processing = selectSalesOrderProcessing(state);
    const {cart, customer} = getState();

    if (processing || !customerAccount?.CustomerNo) {
        return;
    }

    const isCart = cartNo === SalesOrderNo;
    const {ARDivisionNo, CustomerNo} = customerAccount;

    try {
        console.log('loadSalesOrder', SalesOrderNo);
        dispatch({type: FETCH_SALES_ORDER, status: FETCH_INIT, isCart});
        const salesOrder = await fetchSalesOrder({ARDivisionNo, CustomerNo, SalesOrderNo});
        if (salesOrder?.OrderStatus === 'Z') {
            redirect(generatePath(`/account/:customerSlug/carts`, {customerSlug: customerSlug(customerAccount)}));
            return;
        }
        if (!salesOrder || !salesOrder.SalesOrderNo) {
            dispatch({type: FETCH_SALES_ORDER, status: FETCH_FAILURE, isCart});
            dispatch(setAlert({message: 'That sales order was not found!', context: FETCH_SALES_ORDER}));
            // dispatch({type: FETCH_SALES_ORDER, status: FETCH_FAILURE, isCart});
            return;
        }
        dispatch({type: FETCH_SALES_ORDER, status: FETCH_SUCCESS, salesOrder, isCart});
        // check to see if the cart was promoted to an order.
        const isStillCart = [salesOrder]
            .filter(so => so.SalesOrderNo === cartNo)
            .filter(so => isCartOrder(so))
            .length === 1;
        if (!isStillCart) {
            dispatch({type: SET_CART, cart: {}});
        } else {
            const {promo_code} = getState();
            dispatch({type: SET_CART, cart: salesOrder});
            // if (((promo_code.code || '') !== (salesOrder.UDF_PROMO_DEAL || '')) && !promo_code.loading) {
            //     dispatch(applyPromoCode({Company, SalesOrderNo, discountCode: promo_code.code}));
            // }
        }
    } catch (err) {
        if (err instanceof Error) {
            console.debug("loadSalesOrder()", err.message);
        }
        dispatch({type: FETCH_SALES_ORDER, status: FETCH_FAILURE, isCart});
        dispatch(handleError(err, FETCH_SALES_ORDER));
    }
};


export const confirmEmailSent = () => ({type: SEND_ORDER_EMAIL_ACK});


export const duplicateOrder = ({SalesOrderNo, newCartName}) => (dispatch, getState) => {
    const {promo_code} = getState();
    const data = {
        action: CART_ACTIONS.duplicateCart,
        CartName: newCartName,
        SalesOrderNo,
        promo_code: promo_code.code,
    };
    const customer = customerFromState(getState());
    const params = new URLSearchParams();
    params.set('co', customer.Company);
    params.set('account', `${customer.ARDivisionNo}-${customer.CustomerNo}`);
    const url = `/sage/b2b/cart-quote.php?${params.toString()}`;
    dispatch({type: SAVE_CART, status: FETCH_INIT, message: 'Creating new cart'});
    return fetchPOST(url, data)
        .then(res => {
            const {SalesOrderNo} = res;
            localStore.setItem(STORE_CURRENT_CART, SalesOrderNo);
            dispatch({
                type: SET_CART,
                status: FETCH_SUCCESS,
                cart: {SalesOrderNo}
            });
            dispatch(fetchOpenOrders(customer));
            return SalesOrderNo;
        })
        .catch(err => {
            dispatch({type: SAVE_CART, status: FETCH_FAILURE});
            dispatch(handleError(err, SAVE_CART));
        })

};
