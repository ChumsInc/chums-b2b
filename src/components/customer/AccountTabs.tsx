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

function getTabValue(tab: string | undefined) {
    switch (tab) {
        case 'closed':
            return 'invoices';
        default:
            return tab ?? 'billing';
    }
}

export default function AccountTabs() {
    const tabMatch = useMatch('/account/:customerSlug/:tab/*');
    const value = getTabValue(tabMatch?.params.tab);
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
