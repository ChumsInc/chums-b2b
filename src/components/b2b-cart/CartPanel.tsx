import CartCheckoutProvider from "@/hooks/cart-checkout/CartCheckoutProvider.tsx";
import CartPage from "@/components/b2b-cart/CartPage.tsx";
import ErrorBoundary from "@/components/common/ErrorBoundary.tsx";


export default function CartPanel() {
    return (
        <ErrorBoundary>
            <CartCheckoutProvider>
                <CartPage />
            </CartCheckoutProvider>
        </ErrorBoundary>
    )
}
