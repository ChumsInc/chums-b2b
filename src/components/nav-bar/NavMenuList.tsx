import NavProductsLink from "@/components/nav-bar/NavProductsLink";
import NavLoginLink from "@/components/nav-bar/NavLoginLink";
import NavSignupLink from "@/components/nav-bar/NavSignupLink";
import NavAccountsLink from "@/components/nav-bar/NavAccountsLink";
import NavCustomerLink from "@/components/nav-bar/NavCustomerLink";
import NavResourcesLink from "@/components/nav-bar/NavResourcesLink";

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
