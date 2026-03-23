import {selectLoggedIn} from "@/ducks/user/userProfileSlice";
import NavItemButtonLink from "./NavItemButtonLink";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {customerCartURL} from "@/ducks/user/utils";
import CustomerIndicator from "@/components/nav-bar/CustomerIndicator";
import CartIcon from "@/components/b2b-cart/CartIcon";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {useAppSelector} from "@/app/hooks";
import useCustomer from "@/hooks/customer/useCustomer.ts";

export default function CartMenu() {
    const {customer} = useCustomer();
    const isLoggedIn = useAppSelector(selectLoggedIn);
    const currentCart = useAppSelector(selectActiveCartId);

    if (!isLoggedIn) {
        return null;
    }

    if (!customer) {
        return (
            <NavItemButtonLink to="/profile" aria-label="Cart requires a current customer">
                <CustomerIndicator/>
                <ShoppingCartOutlinedIcon fontSize="medium" role="presentation"/>
            </NavItemButtonLink>
        )
    }

    return (
        <NavItemButtonLink to={customerCartURL(customer, currentCart)}>
            <CustomerIndicator/>
            <CartIcon/>
        </NavItemButtonLink>
    )
}
