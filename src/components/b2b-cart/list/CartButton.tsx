

import {useAppDispatch, useAppSelector} from "@/app/hooks";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {loadCart} from "@/ducks/carts/actions";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";

/**
 * @TODO: Refactor for using cartId instead of salesOrderNo
 */
export const CartButton = ({cartId}: {
    cartId: number;
}) => {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const activeCartId = useAppSelector(selectActiveCartId);

    const clickHandler = () => {
        if (customerKey && cartId) {
            dispatch(loadCart({customerKey, cartId, setActiveCart: true}));
        }
    }

    return (
        <IconButton color={cartId === activeCartId ? 'primary' : 'default'}
                    title={cartId === activeCartId ? 'Current Cart' : 'Make this the current cart'}
                    onClick={clickHandler}>
            {cartId !== activeCartId && (<ShoppingCartOutlinedIcon/>)}
            {cartId === activeCartId && (<ShoppingCartIcon/>)}
        </IconButton>);
};

export default CartButton;
