import {styled} from "@mui/material/styles";
import Link, {LinkProps} from "@mui/material/Link";
import React from "react";

const BottomLink = styled(Link)(({theme}) => ({
    color: theme.palette.primary.contrastText,
    padding: '0 0.5rem',
}));

export default function FooterLink({href, target, rel, children, ...rest}: LinkProps) {
    return (
        <BottomLink underline="hover" href={href} target={target} rel={rel} {...rest}>{children}</BottomLink>
    )
}
