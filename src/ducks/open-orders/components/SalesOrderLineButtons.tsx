import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Box from "@mui/material/Box";

export interface SpeedDialActions {
    icon: React.ReactNode;
    name: string;
    disabled?: boolean;
    onClick?: () => void;
}

const SalesOrderLineButtons = ({
                                   onCopyToCart,
                                   copyToCartDisabled
                               }: {
    onCopyToCart?: () => void;
    copyToCartDisabled?: boolean;
}) => {
    const actions: SpeedDialActions[] = [
        {
            icon: <AddShoppingCartIcon/>,
            name: 'Add to Cart',
            disabled: !onCopyToCart || copyToCartDisabled,
            onClick: onCopyToCart
        },
    ]
    return (
        <Box sx={{position: 'relative', height: 'calc(0.5rem + 80px + 24px)'}}>
            <SpeedDial ariaLabel="Cart Item Actions" icon={<SpeedDialIcon/>}
                       direction="left"
                       sx={{position: "absolute", bottom: 8, right: 0}}>
                {actions.filter(action => !action.disabled).map(action => (
                    <SpeedDialAction key={action.name} icon={action.icon}
                                     slotProps={{
                                         tooltip: {
                                             title: action.name,
                                         }
                                     }}
                                     onClick={action.onClick}/>
                ))}
            </SpeedDial>
        </Box>
    )
}

export default SalesOrderLineButtons;
