import NavProductsLink from "@/components/nav-bar/NavProductsLink.tsx";
import NavLoginLink from "@/components/nav-bar/NavLoginLink.tsx";
import NavSignupLink from "@/components/nav-bar/NavSignupLink.tsx";
import NavAccountsLink from "@/components/nav-bar/NavAccountsLink.tsx";
import NavCustomerLink from "@/components/nav-bar/NavCustomerLink.tsx";
import NavResourcesLink from "@/components/nav-bar/NavResourcesLink.tsx";

export default function NavMenuList({inDrawer}: { inDrawer?: boolean }) {
    return (
        <>
            <NavProductsLink inDrawer={inDrawer}/>
            <NavLoginLink inDrawer={inDrawer}/>
            <NavSignupLink inDrawer={inDrawer}/>
            <NavAccountsLink inDrawer={inDrawer}/>
            <NavCustomerLink inDrawer={inDrawer}/>
            <NavResourcesLink inDrawer={inDrawer}/>
        </>
    )
}
