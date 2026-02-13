import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {NavLink, useMatch} from 'react-router'
import {CUSTOMER_TABS, type LinkTabProps} from "@/components/customer/customer-tabs.ts";


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
                setValue('invoices');
                return;
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
