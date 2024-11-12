import React, {useEffect} from 'react';
import CartsFilter from "@components/carts/CartsFilter";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {selectCartsStatus} from "@ducks/carts/selectors";
import LinearProgress from "@mui/material/LinearProgress";
import CartsList from "@components/carts/CartsList";
import {useSelector} from "react-redux";
import {loadCarts} from "@ducks/carts/actions";
import NoCartsAlert from "@components/carts/NoCartsAlert";
import {selectCustomerKey} from "@ducks/customer/selectors";

export default function CartsPage() {
    const dispatch = useAppDispatch();
    const cartsStatus = useAppSelector(selectCartsStatus);
    const customerKey = useSelector(selectCustomerKey);

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
