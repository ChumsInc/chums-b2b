'use client';

import {
    selectCustomerAccount,
    selectCustomerLoaded,
    selectCustomerLoadStatus,
} from "@/ducks/customer/currentCustomerSlice";
import {useEffect} from "react";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import {billToCustomerSlug, customerNo, customerSlug, parseCustomerSlug} from "@/utils/customer";
import Typography from "@mui/material/Typography";
import {useParams} from "react-router";
import {loadCustomer} from "@/ducks/customer/actions";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCustomerShipTo} from "@/ducks/customer/customerShipToAddressSlice";

export default function CustomerIndicator() {
    const dispatch = useAppDispatch();
    const customer = useAppSelector(selectCustomerAccount);
    const currentShipTo = useAppSelector(selectCustomerShipTo);
    const params = useParams<{ customerSlug: string }>();
    const loadStatus = useAppSelector(selectCustomerLoadStatus);
    const loaded = useAppSelector(selectCustomerLoaded);

    useEffect(() => {
        const nextCustomer = billToCustomerSlug(params.customerSlug ?? '');
        if (!nextCustomer && !loaded && !!customer && loadStatus === 'idle' ) {
            dispatch(loadCustomer(customer));
            return;
        }
        if (!nextCustomer) {
            return;
        }
        if (!customer || customerSlug(customer) !== nextCustomer) {
            if (loadStatus !== 'idle') {
                return;
            }
            dispatch(loadCustomer(parseCustomerSlug(nextCustomer)));
            return;
        }
        if (loadStatus === 'idle' && !loaded) {
            dispatch(loadCustomer(customer));
        }
    }, [params, customer, loadStatus, loaded])

    if (!customer) {
        return null;
    }

    return (
        <Tooltip title={(
            <>
                <Typography color="inherit" component="div">{customer.CustomerName}</Typography>
                {currentShipTo &&
                    <Typography color="inherit" sx={{fontSize: 'small'}}>{currentShipTo.ShipToName}</Typography>}
            </>
        )} arrow>
            <Box sx={{mx: 1, whiteSpace: 'pre'}}>
                {customerNo(customer)}
                {!!currentShipTo && <span>/{currentShipTo.ShipToCode}</span>}
            </Box>
        </Tooltip>
    )
}
