

import type {MouseEvent} from "react";
import Button, {type ButtonProps} from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import SendEmailModal from "./SendEmailModal";
import {sendCartEmail} from "@/ducks/carts/actions";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";

export interface SendEmailButtonProps extends ButtonProps {
    cartId: number;
}

export default function SendEmailButton({cartId, onClick, disabled, ...props}: SendEmailButtonProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartId));

    const sendEmailHandler = async (ev: MouseEvent<HTMLButtonElement>) => {
        if (!customerKey) {
            return;
        }
        await dispatch(sendCartEmail({customerKey, cartId}));
        if (onClick) {
            onClick(ev);
        }
    }

    return (
        <>
            <Button type="button" variant="text" onClick={sendEmailHandler}
                    disabled={loadingStatus !== 'idle' || disabled} {...props}>
                Send Email
            </Button>
            <SendEmailModal/>
        </>
    )
}
