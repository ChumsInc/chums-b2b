import React from 'react';
import {useSelector} from "react-redux";
import {selectCustomerAccount} from "../../customer/selectors";
import NavItemButtonLink from "./NavItemButtonLink";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AccountMenu = () => {
    const customer = useSelector(selectCustomerAccount);

    if (!customer) {
        return (
            <NavItemButtonLink to="/cart">
                <ShoppingCartIcon fontSize="medium"/>
            </NavItemButtonLink>
        )
    }
}