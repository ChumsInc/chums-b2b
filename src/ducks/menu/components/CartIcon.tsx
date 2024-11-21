import {useSelector} from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import numeral from "numeral";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {selectActiveCartId} from "@ducks/active-cart/selectors";
import {useAppSelector} from "@app/configureStore";
import {selectActiveCartLoading, selectActiveCartQuantity, selectActiveCartTotal} from "@ducks/carts/selectors";

export default function CartIcon() {
    const cartId = useSelector(selectActiveCartId);
    const cartQty = useSelector(selectActiveCartQuantity);
    const cartLoading = useSelector(selectActiveCartLoading);
    const cartTotal = useAppSelector(selectActiveCartTotal);

    if (!cartId || (cartId === 0 && cartQty === 0)) {
        return (
            <ShoppingCartOutlinedIcon fontSize="medium"/>
        )
    }

    return (
        <>
            <Tooltip title={`Cart #${cartId}`}>
                <Box sx={{m: 1, position: 'relative'}}>
                    <Badge badgeContent={cartQty} color="primary"
                           anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                        <ShoppingCartIcon fontSize="medium"/>
                    </Badge>
                    {cartLoading &&
                        <CircularProgress size={36} sx={{position: 'absolute', top: -6, left: -6, zIndex: 1}}/>}
                </Box>
            </Tooltip>
            <Box sx={{ml: 2}}>{numeral(cartTotal).format('$0,0')}</Box>
        </>
    )
}
