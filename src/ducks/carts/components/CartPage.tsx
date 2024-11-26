import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {useMatch} from "react-router";
import {useSelector} from "react-redux";
import {selectCustomerKey, selectCustomerLoading} from "@ducks/customer/selectors";
import {loadCart} from "@ducks/carts/actions";
import {redirect} from "react-router-dom";
import DocumentTitle from "@components/DocumentTitle";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@ducks/carts/components/header/CartSkeleton";
import {selectCartById} from "@ducks/carts/selectors";
import CartOrderHeader from "@ducks/carts/components/header/CartOrderHeader";
import {parseCartId} from "@ducks/carts/utils";
import CartDetail from "@ducks/carts/components/detail/CartDetail";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/:orderType/:cartId');
    const customerKey = useSelector(selectCustomerKey);
    const customerLoading = useSelector(selectCustomerLoading);
    const cart = useAppSelector((state) => selectCartById(state, parseCartId(match?.params.cartId)))
    const cartHeader = cart?.header ?? null;

    useEffect(() => {
        const cartId = parseCartId(match?.params.cartId);
        if (Number.isNaN(cartId) || !cartId || !customerKey) {
            return;
        }
        dispatch(loadCart({cartId, customerKey, setActiveCart: true}));
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
            <CartDetail cartId={cartHeader.id}/>
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
