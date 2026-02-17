import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {generatePath, useNavigate, useParams} from "react-router";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import {loadCart} from "@/ducks/carts/actions";
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@/components/b2b-cart/header/CartSkeleton";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import CartOrderHeader from "@/components/b2b-cart/header/CartOrderHeader";
import {parseCartId} from "@/ducks/carts/utils";
import CartDetail from "@/components/b2b-cart/detail/CartDetail";
import {billToCustomerSlug} from "@/utils/customer";
import Typography from "@mui/material/Typography";
import {selectCartHeaderById} from "@/ducks/carts/cartHeadersSlice";
import {useTitle} from "@/components/app/TitleContext";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ItemAutocomplete from "@/components/item-lookup/ItemAutocomplete.tsx";
import CartCommentInput from "@/components/b2b-cart/header/CartCommentInput.tsx";

export default function CartPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {title, setPageTitle} = useTitle()
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

    useEffect(() => {
        setPageTitle({
            title: `Cart #${params?.cartId}`
        })
    }, [params?.cartId, setPageTitle]);


    if (!cartHeader || !customerKey) {
        return (
            <div>
                <Typography variant="h3" component="h2">{title}</Typography>
                <CartSkeleton/>
                <LinearProgress variant="indeterminate"/>
            </div>
        )
    }

    return (
        <div>
            <Typography variant="h3" component="h2">Cart #{cartHeader.id}</Typography>
            <CartOrderHeader/>
            <hr/>
            <Stack spacing={2} direction={{sm: 'column', md: 'row'}} justifyContent="space-between"
                   divider={<Divider orientation="vertical" flexItem/>}>
                <ItemAutocomplete cartId={cartHeader.id}/>
                <CartCommentInput cartId={cartHeader.id}/>
            </Stack>
            <CartDetail cartId={cartHeader.id}/>
        </div>
    )
}
