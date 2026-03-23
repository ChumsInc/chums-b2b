import {useEffect} from 'react';
import LinearProgress from "@mui/material/LinearProgress";
import CartSkeleton from "@/components/b2b-cart/header/CartSkeleton";
import CartOrderHeader from "@/components/b2b-cart/header/CartOrderHeader";
import CartDetail from "@/components/b2b-cart/detail/CartDetail";
import Typography from "@mui/material/Typography";
import {useTitle} from "@/components/app/TitleContext";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ItemAutocomplete from "@/components/item-lookup/ItemAutocomplete.tsx";
import CartCommentInput from "@/components/b2b-cart/header/CartCommentInput.tsx";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useCartCheckout} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";
import EditorProvider from "@/hooks/editor/EditorProvider.tsx";

export default function CartPage() {
    const {customerKey} = useCustomer();
    const {cartId, cartHeader} = useCartCheckout();
    const {title, setPageTitle} = useTitle()

    useEffect(() => {
        setPageTitle({
            title: `Cart #${cartId}`
        })
    }, [cartId, setPageTitle]);


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
            <EditorProvider initialValue={cartHeader}>
                <CartOrderHeader/>
            </EditorProvider>
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
