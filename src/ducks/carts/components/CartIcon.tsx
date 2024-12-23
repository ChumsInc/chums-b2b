import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import numeral from "numeral";
import React, {useEffect, useState} from "react";
import Tooltip from "@mui/material/Tooltip";
import {selectActiveCart, selectActiveCartLoading} from "@ducks/carts/selectors";
import {useAppSelector} from "@app/configureStore";
import Decimal from "decimal.js";
import {B2BCart} from "@typeDefs/cart/cart";

function calcCartQty(cart: B2BCart | null): number {
    if (!cart) {
        return 0;
    }
    return cart.detail
        .filter(line => line.itemType === '1')
        .map(line => new Decimal(line.quantityOrdered).times(line.unitOfMeasureConvFactor))
        .reduce((pv, cv) => cv.add(pv), new Decimal(0))
        .toNumber();
}

export default function CartIcon() {
    const cart = useAppSelector(selectActiveCart);
    const [cartQty, setCartQty] = useState<number>(calcCartQty(cart));
    const cartStatus = useAppSelector(selectActiveCartLoading);

    useEffect(() => {
        setCartQty(calcCartQty(cart));
    }, [cart]);

    if (!cart || (cart.header.id === 0 && cartQty === 0)) {
        return (
            <ShoppingCartOutlinedIcon fontSize="medium"/>
        )
    }

    return (
        <>
            <Tooltip title={`Cart #${cart.header.id}`}>
                <Box sx={{m: 1, position: 'relative'}}>
                    <Badge badgeContent={cartQty} color="primary"
                           anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                        <ShoppingCartIcon fontSize="medium"/>
                    </Badge>
                    {cartStatus !== 'idle' && (
                        <CircularProgress size={36} sx={{position: 'absolute', top: -6, left: -6, zIndex: 1}}/>
                    )}
                </Box>
            </Tooltip>
            <Box sx={{ml: 2}}>{numeral(cart.header.subTotalAmt).format('$0,0')}</Box>
        </>
    )
}
