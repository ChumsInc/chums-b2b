import {NavItemProps} from "@typeDefs/ui-features";
import {useSelector} from "react-redux";
import {selectLoggedIn} from "../../user/selectors";
import {selectCustomerAccount} from "../../customer/selectors";
import {generatePath} from "react-router-dom";
import {customerPath} from "../../user/utils";
import React, {useId} from "react";
import NavItemButtonLink from "./NavItemButtonLink";
import NavItemButton from "@ducks/menu/components/NavItemButton";
import MenuItemRouterLink from "@ducks/menu/components/MenuItemRouterLink";
import Menu from "@mui/material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function NavCartsLink({inDrawer}: NavItemProps) {
    const mediaLg = useMediaQuery('(min-width: 1200px)');
    const isLoggedIn = useSelector(selectLoggedIn);
    const account = useSelector(selectCustomerAccount);
    const buttonId = useId();
    const menuId = useId();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!isLoggedIn) {
        return null;
    }

    if (!account) {
        if (inDrawer) {
            return (
                <ListItem>
                    <ListItemText primary="Customer"/>
                </ListItem>
            )
        }
        return (
            <NavItemButtonLink to={null}>
                Customer
            </NavItemButtonLink>
        )

    }

    return (
        <>
            <NavItemButton id={buttonId} sx={{height: '100%'}}
                           aria-label="Current Customer"
                           aria-controls={open ? menuId : undefined}
                           aria-expanded={open ? 'true' : undefined}
                           aria-haspopup="true"
                           onClick={handleClick}>
                Customer
            </NavItemButton>
            <Menu id={menuId}
                  open={open} onClose={handleClose}
                  anchorEl={anchorEl}
                  MenuListProps={{'aria-labelledby': buttonId}}
                  sx={{
                      '& .MuiMenu-list': {
                          display: 'flex',
                          flexDirection: 'column',
                          flexWrap: 'wrap',
                          justifyContent: 'flex-start',
                          color: '#000000'
                      },

                  }}
                  slotProps={{
                      paper: {
                          style: {
                              maxHeight: '75vh',
                              width: mediaLg ? 'fit-content' : '75vw',
                              maxWidth: '100vw',
                          },

                      }
                  }}>
                <MenuItemRouterLink to={generatePath('/account/:customerSlug', {customerSlug: customerPath(account)})}
                                    onClick={handleClose}>Billing Address</MenuItemRouterLink>
                <MenuItemRouterLink
                    to={generatePath('/account/:customerSlug/delivery', {customerSlug: customerPath(account)})}
                    onClick={handleClose}>Delivery Addresses</MenuItemRouterLink>
                <MenuItemRouterLink
                    to={generatePath('/account/:customerSlug/carts', {customerSlug: customerPath(account)})}
                    onClick={handleClose}>Carts</MenuItemRouterLink>
                <MenuItemRouterLink
                    to={generatePath('/account/:customerSlug/orders', {customerSlug: customerPath(account)})}
                    onClick={handleClose}>Open Orders</MenuItemRouterLink>
                <MenuItemRouterLink
                    to={generatePath('/account/:customerSlug/invoices', {customerSlug: customerPath(account)})}
                    onClick={handleClose}>Invoices</MenuItemRouterLink>
            </Menu>
        </>
    )
}
