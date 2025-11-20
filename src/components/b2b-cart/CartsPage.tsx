'use client';

import {useEffect} from 'react';
import CartsFilter from "@/components/b2b-cart/list/CartsFilter";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import LinearProgress from "@mui/material/LinearProgress";
import CartsList from "@/components/b2b-cart/list/CartsList";
import {loadCarts} from "@/ducks/carts/actions";
import NoCartsAlert from "@/components/b2b-cart/list/NoCartsAlert";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import {selectCartsStatus} from "@/ducks/carts/cartStatusSlice";

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
