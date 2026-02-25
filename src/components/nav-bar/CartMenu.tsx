import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import NavItemButtonLink from "./NavItemButtonLink";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";
import {customerCartURL} from "@/ducks/user/utils";
import CustomerIndicator from "@/components/nav-bar/CustomerIndicator";
import CartIcon from "@/components/b2b-cart/CartIcon";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {useAppSelector} from "@/app/hooks";
import {useEffect, useState} from "react";


const CartMenu = () => {
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const currentCustomer = useAppSelector(selectCustomerAccount);
    const currentCart = useAppSelector(selectActiveCartId);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(isLoggedIn);
        // console.log({currentCustomer, isLoggedIn});
    }, [isLoggedIn, currentCustomer]);

    if (!show) {
        return null;
    }

    if (!currentCustomer) {
        return (
            <NavItemButtonLink to="/profile" aria-label="Cart requires a current customer">
                <CustomerIndicator/>
                <ShoppingCartOutlinedIcon fontSize="medium" role="presentation"/>
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
