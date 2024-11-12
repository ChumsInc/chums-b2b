import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {useMatch} from "react-router";
import {useSelector} from "react-redux";
import {selectCustomerKey, selectCustomerLoading} from "@ducks/customer/selectors";
import {loadCart} from "@ducks/b2b-cart/actions";
import {redirect} from "react-router-dom";
import DocumentTitle from "@components/DocumentTitle";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@components/carts/CartSkeleton";
import CartHeaderElement from "@components/carts/CartHeaderElement";
import {selectCartById} from "@ducks/carts/selectors";

export default function CartPage() {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const match = useMatch('/account/:customerSlug/:orderType/:cartId');
    const customerKey = useSelector(selectCustomerKey);
    const customerLoading = useSelector(selectCustomerLoading);
    const cart = useAppSelector((state) => selectCartById(state, +(match?.params.cartId ?? 0)))
    const cartHeader = cart?.header ?? null;

    useEffect(() => {
        if (match?.params.cartId && customerKey) {
            dispatch(loadCart({cartId: +match?.params.cartId, customerKey}));
        }
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
            <CartHeaderElement/>
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
