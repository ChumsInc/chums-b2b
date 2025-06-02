import React, {Fragment} from "react";
import {navItems} from "@/ducks/menu/components/NavItems";
import Box from "@mui/material/Box";

export default function NavBarItems() {
    return (
        <Box sx={{
            display: {xs: 'none', md: 'flex'},
            flex: '1 1 auto',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            {navItems.map((item) => (
                <Fragment key={item.id}>
                    {item.title ?? (item.render ? item.render({}) : null)}
                </Fragment>
            ))}
        </Box>
    )
}
