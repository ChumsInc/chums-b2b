import React from 'react';
import Link, {LinkProps} from "@mui/material/Link";
import {Link as RoutedLink} from 'react-router';

export interface ProductLinkProps extends LinkProps {
    categoryKeyword: string | null;
    productKeyword: string | null;
}

export default function ProductLink({categoryKeyword, productKeyword, children, ...props}: ProductLinkProps) {
    if (!productKeyword) {
        return (
            <>
                {children}
            </>
        )
    }
    const link = categoryKeyword
        ? `/products/${categoryKeyword}/${productKeyword}`
        : `/products/${productKeyword}`;

    return (
        <Link component={RoutedLink} to={link} underline="hover" {...props}>
            {children}
        </Link>
    )

}
