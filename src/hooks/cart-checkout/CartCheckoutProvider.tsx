import {generatePath, useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectActiveCart} from "@/ducks/carts/cartHeadersSlice.ts";
import {selectActiveCartDetail} from "@/ducks/carts/cartDetailSlice.ts";
import {selectNextShipDate} from "@/ducks/carts/activeCartSlice.ts";
import {type ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import {CartCheckoutContext, type CartCheckoutContextState} from "@/hooks/cart-checkout/CartCheckoutContext.tsx";
import {cartProgress} from "@/utils/cart.ts";
import type {CartProgress} from "chums-types/b2b";
import {selectActiveCartStatus} from "@/ducks/carts/cartStatusSlice.ts";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {parseCartId} from "@/ducks/carts/utils.ts";
import {loadCart, loadNextShipDate} from "@/ducks/carts/actions.ts";
import dayjs from "dayjs";
import {billToCustomerSlug} from "@/utils/customer.ts";

export interface CartCheckoutProviderProps {
    children: ReactNode;
}
export default function CartCheckoutProvider({children}:CartCheckoutProviderProps) {
    const dispatch = useAppDispatch();
    const {customerKey} = useCustomer()
    const navigate = useNavigate();
    const params = useParams<'cartId'>();
    const cartHeader = useAppSelector(selectActiveCart);
    const cartDetail = useAppSelector(selectActiveCartDetail);
    const status = useAppSelector(selectActiveCartStatus)
    const nextShipDate = useAppSelector(selectNextShipDate);
    const [shipDate, setShipDate] = useState<string | null>(nextShipDate ?? dayjs().add(7, 'days').format('YYYY-MM-DD'));
    const [progress, setProgress] = useState<CartProgress>(cartProgress.cart);

    const loadCartById = useCallback((cartId: number) => {
        if (Number.isNaN(cartId) || !cartId || !customerKey) {
            return;
        }
        dispatch(loadCart({cartId, customerKey, setActiveCart: true}))
            .then(() => {
                setProgress(cartProgress.cart);
            })
        dispatch(loadNextShipDate())
            .then(response => {
                if (response.meta.requestStatus === 'fulfilled'  && response.payload) {
                    const _nextShipDate = dayjs(response.payload as string);
                    if (_nextShipDate.isAfter(dayjs(shipDate))) {
                        setShipDate(response.payload as string);
                        setProgress(cartProgress.cart);
                    }
                }
            })
    }, [dispatch, customerKey, shipDate, setShipDate, setProgress]);

    const reloadCart = useCallback(() => {
        if (cartHeader) {
            loadCartById(cartHeader.id);
            setProgress(cartProgress.cart);
        }
    }, [cartHeader, loadCartById])

    useEffect(() => {
        if (params.cartId) {
            const cartId = parseCartId(params.cartId);
            if (cartHeader?.id !== cartId) {
                loadCartById(cartId);
            }
        }
    }, [params, loadCartById, cartHeader]);

    useEffect(() => {
        if (status === 'not-found' && customerKey) {
            const path = generatePath('/account/:customerSlug/carts', {customerSlug: billToCustomerSlug(customerKey)})
            navigate(path, {replace: true});
        }
    }, [status, navigate, customerKey]);

    const value = useMemo(() => {
        return {
            cartId: cartHeader?.id ?? null,
            cartHeader,
            cartDetail,
            status,
            progress,
            nextShipDate,
            shipDate,
            setShipDate,
            setProgress,
            reloadCart,
        } as CartCheckoutContextState
    }, [cartHeader, cartDetail, status, progress, nextShipDate, shipDate, setShipDate, setProgress, reloadCart])

    return (
        <CartCheckoutContext value={value}>
            {children}
        </CartCheckoutContext>
    )
}
