import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {loadCustomer} from "@/ducks/customer/actions.ts";
import Button, {type ButtonProps} from "@mui/material/Button";
import {selectCustomerAccount} from "@/ducks/customer/selectors.ts";

const ReloadCustomerButton = ({type, onClick, disabled, ...rest}: ButtonProps) => {
    const dispatch = useAppDispatch();
    const currentCustomer = useAppSelector(selectCustomerAccount);

    const clickHandler = () => {
        dispatch(loadCustomer(currentCustomer));
    }

    return (
        <Button type={type ?? "button"} variant="text"
                onClick={onClick ?? clickHandler} disabled={disabled ?? !currentCustomer}
                {...rest}>
            Reload
        </Button>
    )
}

export default ReloadCustomerButton;
