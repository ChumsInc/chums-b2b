import React, {useState} from "react";
import {useAppDispatch} from "@/app/configureStore";
import {
    STORE_AUTHTYPE,
    STORE_AVATAR,
    STORE_CURRENT_CART,
    STORE_CUSTOMER,
    STORE_CUSTOMER_SHIPPING_ACCOUNT,
    STORE_CUSTOMERS_FILTER_REP,
    STORE_CUSTOMERS_FILTER_STATE,
    STORE_INVOICES_ROWS_PER_PAGE,
    STORE_INVOICES_SORT,
    STORE_PROFILE,
    STORE_RECENT_ACCOUNTS,
    STORE_SHOW_SIGNUP_POPUP,
    STORE_TOKEN,
    STORE_USER_ACCESS,
    STORE_VERSION
} from "@/constants/stores";
import LocalStore from "@/utils/LocalStore";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {StoredProfile} from "@/types/user";
import {RecentCustomer, UserCustomerAccess} from "b2b-types";
import {shortCustomerKey} from "@/utils/customer";
import Typography from "@mui/material/Typography";
import Box, {BoxProps} from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import {clearRecentCustomers, setCustomersRepFilter, setCustomersStateFilter} from "@/ducks/customers/actions";
import {loadProfile, setAvatar, setUserAccess} from "@/ducks/user/actions";
import {setCartShippingAccount} from "@/ducks/carts/actions";
import {getTokenExpirationDate, isTokenExpired} from "@/utils/jwtHelper";

export type StoredSettings = Record<string, string>;

const protectedSettings = [
    STORE_AUTHTYPE,
    STORE_TOKEN,
]

export default function StoredSettings(props: BoxProps) {
    const dispatch = useAppDispatch();
    const [values, setValues] = useState<StoredSettings>(getSettings());

    const removeSettingHandler = (key: string) => {
        LocalStore.removeItem(key);
        switch (key) {
            case STORE_CUSTOMERS_FILTER_STATE:
                dispatch(setCustomersStateFilter(null))
                break;
            case STORE_PROFILE:
                dispatch(loadProfile());
                break;
            case STORE_AVATAR:
                dispatch(setAvatar(null));
                break;
            case STORE_CUSTOMER_SHIPPING_ACCOUNT:
                dispatch(setCartShippingAccount(null));
                break;
            case STORE_CUSTOMERS_FILTER_REP:
                dispatch(setCustomersRepFilter(null));
                break;
            case STORE_RECENT_ACCOUNTS:
                dispatch(clearRecentCustomers());
                break;
            case STORE_USER_ACCESS:
                dispatch(setUserAccess(null));
                break;
        }
        reloadHandler();
    }

    const reloadHandler = () => {
        setValues(getSettings());
    }

    return (
        <Box {...props}>
            <Typography variant="h2" component="h2">
                Stored Settings
            </Typography>
            <Table>
                <Typography component="caption" variant="body2">
                    <Alert severity="warning">
                        <div>Occasionally a setting will be stuck or not cleared from a previous version.
                            Removing those settings may help to restore normal function. These settings will be
                            regenerated automatically as needed.
                        </div>
                        <div>For best results, refresh your browser after clearing a setting.</div>
                    </Alert>
                </Typography>
                <TableHead>
                    <TableRow>
                        <TableCell>Action</TableCell>
                        <TableCell>Key</TableCell>
                        <TableCell>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(values)
                        .map((key) => {
                            return (
                                <TableRow key={key}>
                                    <TableCell>
                                        <Button type="button" variant="outlined" size="small"
                                                onClick={() => removeSettingHandler(key)}
                                                disabled={protectedSettings.includes(key)}>
                                            X
                                        </Button>
                                    </TableCell>
                                    <TableCell>{key}</TableCell>
                                    <TableCell sx={{whiteSpace: 'wrap'}}>{values[key]}</TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </Box>

    )
}

function getSettings(): StoredSettings {
    const keys: string[] = [
        STORE_AUTHTYPE,
        STORE_AVATAR,
        STORE_CURRENT_CART,
        STORE_CUSTOMER,
        STORE_CUSTOMER_SHIPPING_ACCOUNT,
        STORE_CUSTOMERS_FILTER_REP,
        STORE_CUSTOMERS_FILTER_STATE,
        STORE_INVOICES_ROWS_PER_PAGE,
        STORE_INVOICES_SORT,
        STORE_PROFILE,
        STORE_RECENT_ACCOUNTS,
        STORE_SHOW_SIGNUP_POPUP,
        STORE_TOKEN,
        STORE_USER_ACCESS,
        STORE_VERSION
    ]
    const settings: StoredSettings = {};

    function parseProfileValues(value: StoredProfile): string {
        const {email, name, chums} = value as StoredProfile;
        const {id, last_login, logins} = chums?.user ?? {};
        return JSON.stringify({email, name, id, last_login, logins}, undefined, 2);
    }

    function parseRecentAccounts(value: RecentCustomer[]) {
        return JSON.stringify(value.map(c => shortCustomerKey(c)), undefined, 2)
    }

    function parseUserAccess(value: UserCustomerAccess) {
        const {
            id,
            isRepAccount,
            ARDivisionNo,
            CustomerNo,
            CustomerName,
            SalespersonDivisionNo,
            SalespersonNo,
            SalespersonName
        } = value;
        return isRepAccount
            ? JSON.stringify({id, SalespersonDivisionNo, SalespersonNo, SalespersonName}, undefined, 2)
            : JSON.stringify({id, ARDivisionNo, CustomerNo, CustomerName}, undefined, 2);
    }

    keys.forEach((key) => {
        const value = LocalStore.getItem(key, null);
        if (value) {
            switch (key) {
                case STORE_PROFILE:
                    settings[key] = parseProfileValues(value);
                    break;
                case STORE_RECENT_ACCOUNTS:
                    settings[key] = parseRecentAccounts(value)
                    break;
                case STORE_TOKEN:
                    settings[key] = JSON.stringify({
                        getTokenExpirationDate: getTokenExpirationDate(value),
                        isTokenExpired: isTokenExpired(value),
                    }, undefined, 2);
                    break;
                case STORE_USER_ACCESS:
                    settings[key] = parseUserAccess(value);
                    break;
                default:
                    settings[key] = JSON.stringify(value, undefined, 2);
            }
        }
    });
    return settings;
}

