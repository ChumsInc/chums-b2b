import React from "react";
import Typography from "@mui/material/Typography";
import BusinessIcon from "@mui/icons-material/Business";
import {selectCustomerUsers, selectPermittedShipToAddresses} from "../selectors";
import {useMatch} from "react-router";
import {customerUserPath} from "@/utils/path-utils";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import StoreIcon from "@mui/icons-material/Store";
import {useAppSelector} from "@/app/configureStore";

const AccountUserPermissions = () => {
    const users = useAppSelector(selectCustomerUsers);
    const shipToAddresses = useAppSelector(selectPermittedShipToAddresses);
    const match = useMatch(customerUserPath);
    const [user] = users.filter(u => u.id.toString() === match?.params?.id);

    if (!user) {
        return null;
    }

    return (
        <>
            <Typography variant="h4" component="h4">Access Permissions</Typography>
            <Table className="table table-sm" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align="center">Ship To Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {user.shipToCode?.length === 0 && (
                        <TableRow>
                            <TableCell><BusinessIcon aria-label="billing locatoin"/></TableCell>
                            <TableCell colSpan={3}>All Locations</TableCell>
                        </TableRow>
                    )}
                    {shipToAddresses
                        .filter(st => user.shipToCode?.includes(st.ShipToCode))
                        .map(shipTo => (
                            <TableRow key={shipTo.ShipToCode}>
                                <TableCell><StoreIcon aria-label="delivery location"/></TableCell>
                                <TableCell align="center">{shipTo.ShipToCode}</TableCell>
                                <TableCell>{shipTo.ShipToName}</TableCell>
                                <TableCell>{shipTo.ShipToCity}, {shipTo.ShipToState} {shipTo.ShipToCountryCode}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </>
    )
}
export default AccountUserPermissions;
