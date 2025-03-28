import React from 'react';
import Button, {ButtonProps} from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectSendEmailStatus} from "@/ducks/open-orders/selectors";
import SendEmailModal from "./SendEmailModal";
import {sendCartEmail} from "@/ducks/carts/actions";
import {selectCustomerKey} from "@/ducks/customer/selectors";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice";

export interface SendEmailButtonProps extends ButtonProps {
    cartId: number;
}

export default function SendEmailButton({cartId, onClick, disabled, ...props}: SendEmailButtonProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const sendEmailStatus = useAppSelector(selectSendEmailStatus);
    const loadingStatus = useAppSelector((state) => selectCartStatusById(state, cartId));

    const sendEmailHandler = async (ev: React.MouseEvent<HTMLButtonElement>) => {
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
                    disabled={loadingStatus !== 'idle' || sendEmailStatus !== 'idle' || disabled} {...props}>
                Send Email
            </Button>
            <SendEmailModal/>
        </>
    )
}
