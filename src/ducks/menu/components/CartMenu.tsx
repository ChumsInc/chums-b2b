import React from "react";
import {selectLoggedIn} from "../../user/selectors";
import NavItemButtonLink from "./NavItemButtonLink";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {selectCustomerAccount} from "../../customer/selectors";
import {customerCartURL} from "../../user/utils";
import CustomerIndicator from "../../customer/components/CustomerIndicator";
import CartIcon from "../../carts/components/CartIcon";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {useAppSelector} from "@/app/configureStore";


const CartMenu = () => {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const currentCustomer = useAppSelector(selectCustomerAccount);
    const currentCart = useAppSelector(selectActiveCartId);

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
