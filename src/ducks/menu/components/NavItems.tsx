import {NavItem} from "@typeDefs/ui-features";
import NavLoginLink from "./NavLoginLink";
import NavProductsLink from "./NavProductsLink";
import NavSignupLink from "./NavSignupLink";
import NavAccountsLink from "./NavAccountsLink";
import NavResourcesLink from "./NavResourcesLink";
import NavCartsLink from "@ducks/menu/components/NavCartsLink";

export const navItems: NavItem[] = [
    {id: 'products', render: NavProductsLink},
    {id: 'login', render: NavLoginLink},
    {id: 'signup', render: NavSignupLink},
    {id: 'accounts', render: NavAccountsLink},
    {id: 'carts', render: NavCartsLink},
    {id: 'resources', render: NavResourcesLink},
    // {id: 'search', render: SearchBar}
];

