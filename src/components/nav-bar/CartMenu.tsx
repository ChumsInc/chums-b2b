import {selectLoggedIn} from "@/ducks/user/selectors.ts";
import NavItemButtonLink from "./NavItemButtonLink.tsx";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {selectCustomerAccount} from "@/ducks/customer/selectors.ts";
import {customerCartURL} from "@/ducks/user/utils.ts";
import CustomerIndicator from "@/components/nav-bar/CustomerIndicator.tsx";
import CartIcon from "@/components/b2b-cart/CartIcon.tsx";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice.ts";
import {useAppSelector} from "@/app/configureStore.ts";


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
