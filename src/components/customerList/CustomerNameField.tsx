import type {Customer} from "chums-types/b2b";
import Stack from "@mui/material/Stack";

const CustomerNameField = ({customer}: { customer: Customer }) => {
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
