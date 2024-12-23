import React from "react";
import {useSelector} from "react-redux";
import {useAppDispatch} from "@app/configureStore";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {selectActiveCartId} from "@ducks/carts/selectors";
import {loadCart} from "@ducks/carts/actions";
import {selectCustomerKey} from "@ducks/customer/selectors";

/**
 * @TODO: Refactor for using cartId instead of salesOrderNo
 */
export const CartButton = ({cartId}: {
    cartId: number;
}) => {
    const dispatch = useAppDispatch();
    const customerKey = useSelector(selectCustomerKey);
    const activeCartId = useSelector(selectActiveCartId);

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
