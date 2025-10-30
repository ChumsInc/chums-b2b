import {type MouseEvent} from "react";
import Button, {type ButtonProps} from "@mui/material/Button";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectSendEmailStatus} from "@/ducks/open-orders/selectors.ts";
import SendEmailModal from "./SendEmailModal.tsx";
import {sendCartEmail} from "@/ducks/carts/actions.ts";
import {selectCustomerKey} from "@/ducks/customer/selectors.ts";
import {selectCartStatusById} from "@/ducks/carts/cartStatusSlice.ts";

export interface SendEmailButtonProps extends ButtonProps {
    cartId: number;
}

export default function SendEmailButton({cartId, onClick, disabled, ...props}: SendEmailButtonProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const sendEmailStatus = useAppSelector(selectSendEmailStatus);
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
                    disabled={loadingStatus !== 'idle' || sendEmailStatus !== 'idle' || disabled} {...props}>
                Send Email
            </Button>
            <SendEmailModal/>
        </>
    )
}
