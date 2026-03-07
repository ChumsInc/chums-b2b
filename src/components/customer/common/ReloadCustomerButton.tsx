import {useAppSelector} from "@/app/hooks";
import Button, {type ButtonProps} from "@mui/material/Button";
import {selectCustomerAccount} from "@/ducks/customer/currentCustomerSlice";
import useCustomer from "@/components/customer/hooks/useCustomer.ts";

export default function ReloadCustomerButton ({type, onClick, disabled, ...rest}: ButtonProps) {
    const {reloadCustomer} = useCustomer();
    const currentCustomer = useAppSelector(selectCustomerAccount);

    const clickHandler = () => {
        reloadCustomer();
    }

    return (
        <Button type={type ?? "button"} variant="text"
                onClick={onClick ?? clickHandler} disabled={disabled ?? !currentCustomer}
                {...rest}>
            Reload
        </Button>
    )
}
