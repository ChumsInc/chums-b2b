import {NavItem} from "@/types/ui-features";
import NavLoginLink from "./NavLoginLink";
import NavProductsLink from "./NavProductsLink";
import NavSignupLink from "./NavSignupLink";
import NavAccountsLink from "./NavAccountsLink";
import NavResourcesLink from "./NavResourcesLink";
import NavCustomerLink from "@/ducks/menu/components/NavCustomerLink";

export const navItems: NavItem[] = [
    {id: 'products', render: NavProductsLink},
    {id: 'login', render: NavLoginLink},
    {id: 'signup', render: NavSignupLink},
    {id: 'accounts', render: NavAccountsLink},
    {id: 'customer', render: NavCustomerLink},
    {id: 'resources', render: NavResourcesLink},
    // {id: 'search', render: SearchBar}
];

