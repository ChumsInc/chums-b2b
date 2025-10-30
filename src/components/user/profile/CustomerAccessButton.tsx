import type {UserCustomerAccess} from "b2b-types";
import {generatePath, Link as RoutedLink} from "react-router";
import {PATH_CUSTOMER_ACCOUNT} from "@/constants/paths";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {customerSlug, longCustomerNo} from "@/utils/customer";
import React from "react";

export interface AccessButtonProps {
    access: UserCustomerAccess;
    active?: boolean;
}
export default function CustomerAccessButton({access, active}: AccessButtonProps) {
    const linkPath = generatePath(PATH_CUSTOMER_ACCOUNT, {customerSlug: customerSlug(access)})

    return (
        <Button variant={active ? "contained" : "outlined"} component={RoutedLink} to={linkPath}>
            <Stack direction="column" textAlign="center">
                <div>
                    {longCustomerNo(access)}
                </div>
                <div>{access.CustomerName}</div>
            </Stack>
        </Button>
    )
}
