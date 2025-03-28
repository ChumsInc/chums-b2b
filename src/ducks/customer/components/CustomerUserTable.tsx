import React, {useState} from 'react';
import UserIcon from "./UserIcon";
import BusinessIcon from '@mui/icons-material/Business';
import {useSelector} from "react-redux";
import {selectIsEmployee} from "../../user/selectors";
import {CustomerUser} from "b2b-types";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Tooltip from "@mui/material/Tooltip";
import {generatePath, useMatch, useNavigate} from "react-router";
import {selectCustomerUserSort, selectPermittedCustomerUsers} from "../selectors";
import {customerUserPath} from "@/utils/path-utils";
import Chip, {ChipProps} from "@mui/material/Chip";
import StoreIcon from '@mui/icons-material/Store';
import {UserAccessType} from "b2b-types/src/user";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {setCustomerUserSort} from "@/ducks/customer/actions";
import TableSortLabel from "@mui/material/TableSortLabel";


const CustomerPermissionsIcon = ({
                                     billTo,
                                     shipToCode,
                                     accountType,
                                 }: {
    billTo?: boolean;
    shipToCode?: string[];
    accountType: UserAccessType;
}) => {
    if (billTo) {
        return (
            <Tooltip title="Complete Account">
                <BusinessIcon fontSize="small" aria-label="billing location"/>
            </Tooltip>
        )
    }
    if (!shipToCode || !shipToCode.length) {
        return (
            <Chip label="N/A" color="warning"/>
        )
    }
    const label = shipToCode.length === 1 ? shipToCode[0] : `x ${shipToCode.length}`;
    const colorProp = (accountType: UserAccessType): Pick<ChipProps, 'color'> => {
        switch (accountType) {
            case 1:
                return {color: 'primary'};
            case 2:
                return {color: 'info'};
            default:
                return {color: 'success'};
        }
    }
    return (
        <Tooltip title={`Locations: ${shipToCode.length}`}>
            <Stack direction="row" spacing={2}>
                <StoreIcon fontSize="small" aria-label="delivery location"/>
                <Chip label={label} {...colorProp(accountType)}
                      variant={shipToCode.length === 1 ? 'filled' : 'outlined'} size="small"/>
            </Stack>
        </Tooltip>
    )
}

const CustomerUserRow = ({
                             user,
                             selected,
                             onClick,
                         }: {
    user: CustomerUser;
    selected?: boolean;
    onClick: () => void;
}) => {
    return (
        <TableRow key={user.id} onClick={onClick} selected={selected}>
            <TableCell aria-label="user type"><UserIcon accountType={user.accountType}/></TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>
                <Link href={`mailto:${user.email}`} target="_blank">{user.email}</Link>
            </TableCell>
            <TableCell>
                <CustomerPermissionsIcon shipToCode={user.shipToCode} billTo={user.billTo}
                                         accountType={user.accountType}/>
            </TableCell>
        </TableRow>
    )
}

const CustomerUserTable = () => {
    const dispatch = useAppDispatch();
    const users = useSelector(selectPermittedCustomerUsers);
    const [page, setPage] = useState(0);
    const isEmployee = useSelector(selectIsEmployee);
    const match = useMatch(customerUserPath);
    const navigate = useNavigate();
    const sort = useAppSelector(selectCustomerUserSort);

    const userSelectHandler = (user: CustomerUser) => {
        if (match?.params?.customerSlug) {
            navigate(generatePath(customerUserPath, {
                customerSlug: match?.params?.customerSlug,
                id: user.id.toString()
            }))
        }
    }

    const sortChangeHandler = (field: keyof CustomerUser) => {
        dispatch(setCustomerUserSort({field, ascending: field === sort.field ? !sort.ascending : true}));
    }

    return (
        <div>
            <Table size="small">
                {isEmployee && (<caption>Only users with explicitly assigned access are shown here.</caption>)}
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Type
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sort.field === 'name'}
                                direction={sort.ascending ? 'asc' : 'desc'}
                                onClick={() => sortChangeHandler('name')}>
                                Name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel
                                active={sort.field === 'email'}
                                direction={sort.ascending ? 'asc' : 'desc'}
                                onClick={() => sortChangeHandler('email')}>
                                Email Address
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>Permissions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users
                        .filter(u => u.id !== 0)
                        .slice(page * 10, page * 10 + 10)
                        .map(user => (
                            <CustomerUserRow key={user.id}
                                             user={user}
                                             onClick={() => userSelectHandler(user)}
                                             selected={user.id.toString() === match?.params.id}/>
                        ))
                    }
                </TableBody>
            </Table>
            <TablePagination component="div"
                             count={users.length} onPageChange={(ev, page) => setPage(page)} page={page}
                             rowsPerPage={10}/>
        </div>
    )
}

export default CustomerUserTable;
