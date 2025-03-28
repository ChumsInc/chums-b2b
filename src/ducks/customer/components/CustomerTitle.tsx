import React from 'react';
import {BillToCustomer, ShipToCustomer} from "b2b-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {customerNo, isValidCustomer} from "@/utils/customer";

export default function CustomerTitle({customer, shipTo, loading}:{
    customer: BillToCustomer|null;
    shipTo: ShipToCustomer|null;
    loading?: boolean;
}) {
    return (
        <>
            <Typography variant="h1" component="h1">
                {customer?.CustomerName}
                {shipTo
                    && shipTo.ShipToCode !== customer?.PrimaryShipToCode
                    && (
                        <>
                            <Box component="span" sx={{mx: 1}}>/</Box>
                            <Box component="span">
                                {shipTo.ShipToName}
                            </Box>
                        </>
                    )}
            </Typography>
            <Typography variant="h2" component="h2">
                {isValidCustomer(customer) && (
                    <Box sx={{me: 3}}>
                        {customerNo(customer)}
                        {shipTo
                            && shipTo.ShipToCode !== customer?.PrimaryShipToCode
                            && (
                                <Box component="span">
                                    /{shipTo.ShipToCode}
                                </Box>
                            )}
                    </Box>
                )}
                {!isValidCustomer(customer) && !loading && <Box>Please select a customer</Box>}
            </Typography>
        </>
    )
}
