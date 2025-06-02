import React, {useState} from "react";
import {MinimalMenuItem} from "@/ducks/menu/types";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemLink from "@/components/ListItemLink";
import Divider from "@mui/material/Divider";

export interface DrawerMenuProps {
    title: string;
    to?: string;
    items?: MinimalMenuItem[];
}

function DrawerMenu({title, to, items}: DrawerMenuProps) {
    const [show, setShow] = useState(false);

    const clickHandler = (ev: React.MouseEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        setShow(!show);
    }
    if (!items?.length && !!to) {
        return (
            <ListItemLink primary={title} to={to}/>
        )
    }

    return (
        <>
            <ListItemButton onClick={clickHandler}>
                <ListItemText primary={title}/>
                {show ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={show}>
                <List component="div" disablePadding>
                    {items?.map(item => (
                        <ListItemLink sx={{pl: 4}} key={item.id} primary={item.title} to={item.url}/>
                    ))}
                </List>
            </Collapse>
            {show && <Divider sx={{my: '0.5rem'}}/>}
        </>

    )
}

DrawerMenu.displayName = 'DrawerMenu';
export default DrawerMenu;
