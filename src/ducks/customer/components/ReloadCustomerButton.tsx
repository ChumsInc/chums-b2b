import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCurrentCustomer} from "../../user/selectors";
import {loadCustomer} from "../actions";
import Button, {ButtonProps} from "@mui/material/Button";

const ReloadCustomerButton = ({type, onClick, disabled, ...rest}: ButtonProps) => {
    const dispatch = useAppDispatch();
    const currentCustomer = useAppSelector(selectCurrentCustomer);

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
