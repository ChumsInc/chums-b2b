import React, {useState} from 'react';
import {useSelector} from "react-redux";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import {addressFromShipToAddress, multiLineAddress} from "@ducks/customer/utils";
import {getShippingMethod} from "@constants/account";
import {useAppDispatch, useAppSelector} from "@app/configureStore";
import {loadCart} from "@ducks/carts/actions";
import Grid from '@mui/material/Unstable_Grid2';
import {useMatch} from "react-router";
import DuplicateCartDialog from "@ducks/cart/components/DuplicateCartDialog";
import {duplicateSalesOrder} from "@ducks/cart/actions";
import {selectCartLoading} from "@ducks/cart/selectors";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {selectCustomerKey} from "@ducks/customer/selectors";
import {selectCartHeaderById} from "@ducks/carts/selectors";

const SalesOrderHeaderElement = () => {
    const dispatch = useAppDispatch();
    const match = useMatch('/account/:customerSlug/:orderType/:cartId');
    const customerKey = useSelector(selectCustomerKey);
    const header = useAppSelector((state) => selectCartHeaderById(state, +(match?.params.cartId ?? 0)));
    const cartLoading = useAppSelector(selectCartLoading);
    const [showDuplicateCart, setShowDuplicateCart] = useState(false);

    const hasCancelDate = header?.UDF_CANCEL_DATE ? dayjs(header?.UDF_CANCEL_DATE).valueOf() > 0 : false;
    const cancelDate = hasCancelDate ? dayjs(header?.UDF_CANCEL_DATE).format('YYYY-MM-DD') : '';
    const orderDate = header?.dateCreated ? dayjs(header.dateCreated).format('YYYY-MM-DD') : '';
    const shipDate = header?.shipExpireDate ? dayjs(header.shipExpireDate).format('YYYY-MM-DD') : '';

    const reloadHandler = () => {
        if (!customerKey || !header) {
            return;
        }
        dispatch(loadCart({customerKey: customerKey, cartId: header.id}))
    }

    const duplicateCartHandler = async (cartName: string, shipTo: string) => {
        if (!header?.salesOrderNo) {
            return;
        }
        await dispatch(duplicateSalesOrder({cartName, salesOrderNo: header.salesOrderNo, shipToCode: shipTo}))
        setShowDuplicateCart(false);
    }

    if (!customerKey || !header) {
        return null;
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <TextField label="Order Date" type="date" fullWidth variant="filled" size="small"
                                   value={orderDate} placeholder=""
                                   inputProps={{readOnly: true}}/>
                        <TextField label="Purchase Order No" type="text" fullWidth variant="filled" size="small"
                                   value={header?.customerPONo ?? ''}
                                   inputProps={{readOnly: true}}/>
                        {hasCancelDate && (
                            <TextField label="Cancel Date" type="date" fullWidth
                                       value={cancelDate}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        )}
                        <TextField label="Cart Expires" type="date" size="small" variant="filled" fullWidth
                                   value={shipDate}
                                   inputProps={{readOnly: true}}/>
                        {header?.promoCode && (
                            <TextField label="Promo Code" type="text" fullWidth
                                       value={header?.promoCode ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        )}
                    </Stack>
                </Grid>
                <Grid xs={12} lg={6}>
                    <Stack spacing={2} direction="column">
                        <TextField label="Ship To Code" type="text" variant="filled" size="small"
                                   value={header?.shipToCode ?? 'Default Address'}
                                   inputProps={{readOnly: true}}/>
                        <TextField label="Delivery Address" type="text" multiline variant="filled" size="small"
                                   value={multiLineAddress(addressFromShipToAddress(header), true).join('\n')}
                                   inputProps={{readOnly: true}}/>
                        <Stack spacing={2} direction={{xs: 'column', md: 'row'}}>
                            <TextField label="Ship Via" type="text" fullWidth
                                       value={getShippingMethod(header?.shipVia)?.description ?? header?.shipVia ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                            <TextField label="Ship Comment" type="text" fullWidth
                                       value={header?.comment ?? ''}
                                       variant="filled" size="small" inputProps={{readOnly: true}}/>
                        </Stack>
                        <Stack spacing={2} direction={{sm: 'column', md: 'row'}} sx={{justifyContent: 'flex-end'}}>
                            <Button type="button" variant="text" onClick={reloadHandler}>Reload</Button>
                            <Button type="button" variant="outlined" onClick={() => setShowDuplicateCart(true)}>Duplicate
                                Order</Button>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <DuplicateCartDialog open={showDuplicateCart} SalesOrderNo={header?.salesOrderNo}
                                 shipToCode={header.shipToCode}
                                 loading={cartLoading}
                                 onConfirm={duplicateCartHandler}
                                 onCancel={() => setShowDuplicateCart(false)}/>
        </div>
    )
}

export default SalesOrderHeaderElement;
