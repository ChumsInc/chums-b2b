import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {useMatch} from "react-router";
import {useSelector} from "react-redux";
import {selectCustomerKey, selectCustomerLoading} from "@ducks/customer/selectors";
import {loadCart} from "@ducks/carts/actions";
import {redirect} from "react-router-dom";
import DocumentTitle from "@components/DocumentTitle";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@components/carts/CartSkeleton";
import {selectCartById} from "@ducks/carts/selectors";
import CartOrderHeader from "@components/carts/CartOrderHeader";
import {setCurrentCartId} from "@ducks/active-cart/actions";
import {parseCartId} from "@ducks/carts/utils";
import CartTotal from "@components/carts/CartTotal";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/:orderType/:cartId');
    const customerKey = useSelector(selectCustomerKey);
    const customerLoading = useSelector(selectCustomerLoading);
    const cart = useAppSelector((state) => selectCartById(state, +(match?.params.cartId ?? 0)))
    const cartHeader = cart?.header ?? null;

    useEffect(() => {
        const cartId = parseCartId(match?.params.cartId);
        if (Number.isNaN(cartId) || !cartId || !customerKey) {
            return;
        }
        dispatch(setCurrentCartId(cartId))
        dispatch(loadCart({cartId, customerKey}));
    }, [match, customerKey]);


    if (!customerKey && !customerLoading) {
        redirect('/profile');
        return;
    }

    const documentTitle = `Cart Info #${match?.params?.cartId}`;

    if (!cartHeader || !customerKey) {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <div className="sales-order-page">
                    <CartSkeleton/>
                </div>
                <LinearProgress variant="indeterminate"/>
            </div>
        )
    }

    return (
        <div>
            <DocumentTitle documentTitle={documentTitle}/>
            <CartOrderHeader/>
            <div>
                <code>
                    <pre>
                        {JSON.stringify(cartHeader, undefined, 2)}
                    </pre>
                </code>
            </div>
        </div>
    )
}
