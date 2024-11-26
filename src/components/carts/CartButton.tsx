import React from "react";
import {useSelector} from "react-redux";
import {selectCartNo} from "@ducks/cart/selectors";
import {useAppDispatch} from "@app/configureStore";
import {setCurrentCart} from "@ducks/cart/actions";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

/**
 * @TODO: Refactor for using cartId instead of salesOrderNo
 */
export const CartButton = ({salesOrderNo}: {
    salesOrderNo: string;
}) => {
    const dispatch = useAppDispatch();
    const currentCart = useSelector(selectCartNo);

    const clickHandler = () => {
        dispatch(setCurrentCart(salesOrderNo));
    }
    return (
        <IconButton color={currentCart === salesOrderNo ? 'primary' : 'default'}
                    title={currentCart === salesOrderNo ? 'Current Cart' : 'Make this the current cart'}
                    onClick={clickHandler}>
            {currentCart !== salesOrderNo && (<ShoppingCartOutlinedIcon/>)}
            {currentCart === salesOrderNo && (<ShoppingCartIcon/>)}
        </IconButton>);
};

export default CartButton;
