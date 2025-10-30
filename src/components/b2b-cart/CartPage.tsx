import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {generatePath, useNavigate, useParams} from "react-router";
import {selectCustomerKey} from "@/ducks/customer/selectors.ts";
import {loadCart} from "@/ducks/carts/actions.ts";
import DocumentTitle from "@/components/DocumentTitle.tsx";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@/components/b2b-cart/header/CartSkeleton.tsx";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";
import CartOrderHeader from "@/components/b2b-cart/header/CartOrderHeader.tsx";
import {parseCartId} from "@/ducks/carts/utils.ts";
import CartDetail from "@/components/b2b-cart/detail/CartDetail.tsx";
import {billToCustomerSlug} from "@/utils/customer.ts";
import Typography from "@mui/material/Typography";
import {selectCartHeaderById} from "@/ducks/carts/cartHeadersSlice.ts";

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
