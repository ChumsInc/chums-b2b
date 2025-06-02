import React, {useEffect} from "react";
import CartsFilter from "@/ducks/carts/components/list/CartsFilter";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import LinearProgress from "@mui/material/LinearProgress";
import CartsList from "@/ducks/carts/components/list/CartsList";
import {loadCarts} from "@/ducks/carts/actions";
import NoCartsAlert from "@/ducks/carts/components/list/NoCartsAlert";
import {selectCustomerKey} from "@/ducks/customer/selectors";
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
