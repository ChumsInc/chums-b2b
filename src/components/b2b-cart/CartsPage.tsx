import {useEffect} from 'react';
import CartsFilter from "@/components/b2b-cart/list/CartsFilter.tsx";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import LinearProgress from "@mui/material/LinearProgress";
import CartsList from "@/components/b2b-cart/list/CartsList.tsx";
import {loadCarts} from "@/ducks/carts/actions.ts";
import NoCartsAlert from "@/components/b2b-cart/list/NoCartsAlert.tsx";
import {selectCustomerKey} from "@/ducks/customer/selectors.ts";
import {selectCartsStatus} from "@/ducks/carts/cartStatusSlice.ts";

export default function CartsPage() {
    const dispatch = useAppDispatch();
    const cartsStatus = useAppSelector(selectCartsStatus);
    const customerKey = useAppSelector(selectCustomerKey);

    useEffect(() => {
        dispatch(loadCarts(customerKey));
    }, [customerKey]);

    return (
        <div>
            <CartsFilter/>
            {cartsStatus === 'loading' && <LinearProgress variant="indeterminate" sx={{mb: 1}}/>}
            <CartsList/>
            <NoCartsAlert/>
        </div>
    )
}
