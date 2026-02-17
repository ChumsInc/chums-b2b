export interface LinkTabProps {
    to: string;
    value: string;
    label: string;
}

export const CUSTOMER_TABS: LinkTabProps[] = [
    {value: 'billing', label: 'Billing address', to: ''},
    {value: 'delivery', label: 'Delivery Addresses', to: 'delivery'},
    {value: 'users', label: 'Users', to: 'users'},
    {value: 'carts', label: 'Carts', to: 'carts'},
    {value: 'orders', label: 'Open Orders', to: 'orders'},
    {value: 'invoices', label: 'Invoices', to: 'invoices'},
];
