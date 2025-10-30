import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {generatePath, useNavigate, useParams} from "react-router";
import {selectCustomerKey} from "@/ducks/customer/selectors";
import {loadCart} from "@/ducks/carts/actions";
import DocumentTitle from "@/components/DocumentTitle";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@/components/b2b-cart/header/CartSkeleton";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import CartOrderHeader from "@/components/b2b-cart/header/CartOrderHeader";
import {parseCartId} from "@/ducks/carts/utils";
import CartDetail from "@/components/b2b-cart/detail/CartDetail";
import {billToCustomerSlug} from "@/utils/customer";
import Typography from "@mui/material/Typography";
import {selectCartHeaderById} from "@/ducks/carts/cartHeadersSlice";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams<{ cartId: string; }>();
    const customerKey = useAppSelector(selectCustomerKey);
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, parseCartId(params.cartId)))
    const cartHeader = useAppSelector((state) => selectCartHeaderById(state, parseCartId(params.cartId)));


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
    }, [cartStatus, customerKey]);

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
            <Typography variant="h3" component="h2">Cart #{cartHeader.id}</Typography>
            <CartOrderHeader/>
            <CartDetail cartId={cartHeader.id}/>
        </div>
    )
}
