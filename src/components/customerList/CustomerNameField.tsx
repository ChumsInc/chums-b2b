import Stack from "@mui/material/Stack";
import type {ListedCustomer} from "@/ducks/customers/types.ts";

const CustomerNameField = ({customer}: { customer: ListedCustomer }) => {
    if (!customer.ShipToCode) {
        return customer.CustomerName;
    }
    return (
        <Stack direction="column">
            <div>{customer.BillToName}</div>
            <div>{customer.CustomerName}</div>
        </Stack>
    )
}

export default CustomerNameField;
