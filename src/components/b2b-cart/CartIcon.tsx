import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CircularProgress from "@mui/material/CircularProgress";
import numeral from "numeral";
import Tooltip from "@mui/material/Tooltip";
import {useAppSelector} from "@/app/hooks";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";
import {selectActiveCartId} from "@/ducks/carts/activeCartSlice";
import {selectCartQtyByCartId} from "@/ducks/carts/cartDetailSlice";
import {selectCartTotalById} from "@/ducks/carts/cartHeadersSlice";

export default function CartIcon() {
    const cartId = useAppSelector(selectActiveCartId);
    const cartQty = useAppSelector((state) => selectCartQtyByCartId(state, cartId));
    const cartTotal = useAppSelector((state) => selectCartTotalById(state, cartId));
    const cartStatus = useAppSelector((state) => selectCartStatusById(state, cartId ?? 0));

    if (!cartId) {
        return (
            <ShoppingCartOutlinedIcon fontSize="medium"/>
        )
    }

    return (
        <>
            <Tooltip title={`Cart #${cartId}`}>
                <Box sx={{m: 1, position: 'relative'}}>
                    <Badge badgeContent={cartQty} color="primary" max={99999}
                           anchorOrigin={{vertical: "bottom", horizontal: 'right'}}>
                        <ShoppingCartIcon fontSize="medium" aria-label={`Cart #${cartId}`}/>
                    </Badge>
                    {cartStatus !== 'idle' && (
                        <CircularProgress size={36} sx={{position: 'absolute', top: -6, left: -6, zIndex: 1}}/>
                    )}
                </Box>
            </Tooltip>
            <Box sx={{ml: 2}}>{numeral(cartTotal).format('$0,0')}</Box>
        </>
    )
}
