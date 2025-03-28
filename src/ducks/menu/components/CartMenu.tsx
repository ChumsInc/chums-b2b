import React from 'react';
import {useSelector} from "react-redux";
import {selectLoggedIn} from "../../user/selectors";
import NavItemButtonLink from "./NavItemButtonLink";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {selectCustomerAccount} from "../../customer/selectors";
import {customerCartURL} from "../../user/utils";
import CustomerIndicator from "../../customer/components/CustomerIndicator";
import CartIcon from "../../carts/components/CartIcon";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";


const CartMenu = () => {
    const isLoggedIn = useSelector(selectLoggedIn);
    const currentCustomer = useSelector(selectCustomerAccount);
    const currentCart = useSelector(selectActiveCartId);

    if (!isLoggedIn) {
        return null;
    }

    if (!currentCustomer) {
        return (
            <NavItemButtonLink to="/profile">
                <CustomerIndicator/>
                <ShoppingCartOutlinedIcon fontSize="medium"/>
            </NavItemButtonLink>
        )
    }

    if (!currentCart || currentCart === 0) {
        return (
            <NavItemButtonLink to={customerCartURL(currentCustomer)}>
                <CustomerIndicator/>
                <CartIcon/>
            </NavItemButtonLink>
        )
    }

    return (
        <NavItemButtonLink to={customerCartURL(currentCustomer, currentCart)}>
            <CustomerIndicator/>
            <CartIcon/>
        </NavItemButtonLink>
    )
}
export default CartMenu;
