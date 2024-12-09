import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import {selectCustomerKey, selectCustomerLoading} from "@ducks/customer/selectors";
import {loadCart} from "@ducks/carts/actions";
import {generatePath} from "react-router-dom";
import DocumentTitle from "@components/DocumentTitle";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@ducks/carts/components/header/CartSkeleton";
import {selectCartById, selectCartStatusById} from "@ducks/carts/selectors";
import CartOrderHeader from "@ducks/carts/components/header/CartOrderHeader";
import {parseCartId} from "@ducks/carts/utils";
import CartDetail from "@ducks/carts/components/detail/CartDetail";
import {billToCustomerSlug} from "@utils/customer";
import Typography from "@mui/material/Typography";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams<{ cartId: string; }>();
    const customerKey = useSelector(selectCustomerKey);
    const customerLoading = useSelector(selectCustomerLoading);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, parseCartId(params.cartId)))
    const cart = useAppSelector((state) => selectCartById(state, parseCartId(params.cartId)))
    const cartHeader = cart?.header ?? null;

    useEffect(() => {
        const cartId = parseCartId(params.cartId);
        if (Number.isNaN(cartId) || !cartId || !customerKey) {
            return;
        }
        dispatch(loadCart({cartId, customerKey, setActiveCart: true}));
    }, [params, customerKey]);

    useEffect(() => {
        if (cartStatus === 'not-found') {
            navigate(generatePath('/account/:customerSlug/carts', {customerSlug: billToCustomerSlug(customerKey)}), {replace: true});
        }
    }, [cartStatus, customerKey])

    if (!customerKey && !customerLoading) {
        navigate('/profile', {replace: true});
        return;
    }

    const documentTitle = `Cart #${params?.cartId}`;

    if (!cartHeader || !customerKey) {
        return (
            <div>
                <DocumentTitle documentTitle={documentTitle}/>
                <Typography variant="h3" component="h2">{documentTitle}</Typography>
                <CartSkeleton/>
                <LinearProgress variant="indeterminate"/>
            </div>
        )
    }

    return (
        <div>
            <DocumentTitle documentTitle={documentTitle}/>
            <Typography variant="h3" component="h2">Cart #{cart.header.id}</Typography>
            <CartOrderHeader/>
            <CartDetail cartId={cartHeader.id}/>
        </div>
    )
}
