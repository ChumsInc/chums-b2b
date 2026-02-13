import {generatePath, Link as RoutedLink} from "react-router";
import {PATH_PROFILE_ACCOUNT} from "@/constants/paths";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {longRepNo} from "@/utils/customer";
import type {UserCustomerAccess} from "chums-types/b2b";

export interface AccessButtonProps {
    access: UserCustomerAccess;
    active?: boolean;
}
export default function RepAccessButton({access, active}: AccessButtonProps) {
    const linkPath = generatePath(PATH_PROFILE_ACCOUNT, {id: `${access.id}`})

    return (
        <Button variant={active ? "contained" : "outlined"} component={RoutedLink} to={linkPath}>
            <Stack direction="column" textAlign="center">
                <div>
                    {longRepNo({
                        SalespersonDivisionNo: access.SalespersonDivisionNo,
                        SalespersonNo: access.SalespersonNo
                    })}
                </div>
                <div>{access.SalespersonName}</div>
            </Stack>
        </Button>
    )
}
