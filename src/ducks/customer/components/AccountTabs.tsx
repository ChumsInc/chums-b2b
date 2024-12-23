import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {NavLink, useMatch} from 'react-router'

interface LinkTabProps {
    to: string;
    value: string;
    label: string;
}

export const CUSTOMER_TABS: LinkTabProps[] = [
    {value: 'billing', label: 'Billing Address', to: ''},
    {value: 'delivery', label: 'Delivery Addresses', to: 'delivery'},
    {value: 'users', label: 'Users', to: 'users'},
    {value: 'carts', label: 'Carts', to: 'carts'},
    {value: 'orders', label: 'Open Orders', to: 'orders'},
    {value: 'invoices', label: 'Invoices', to: 'invoices'},
];


function LinkTab({value, label, to}: LinkTabProps) {
    return (
        <Tab component={NavLink} to={to} label={label} value={value}/>
    );
}

const AccountTabs = () => {
    const [value, setValue] = useState('billing')
    const tabMatch = useMatch('/account/:customerSlug/:tab/*');
    useEffect(() => {
        switch (tabMatch?.params.tab) {
            case 'closed':
                return setValue('invoices');
            default:
                setValue(tabMatch?.params.tab ?? 'billing');
        }
    }, [tabMatch?.params]);

    return (
        <Box sx={{width: '100%', mb: 1}}>
            <Tabs value={value}>
                {CUSTOMER_TABS.map(tab => (
                    <LinkTab key={tab.value} {...tab} />
                ))}
            </Tabs>
        </Box>
    )
}

export default AccountTabs;
