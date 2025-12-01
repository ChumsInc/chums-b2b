import type {B2BCartHeader} from "chums-types/b2b";
import dayjs from "dayjs";
import type {ChangeEvent} from "react";

export type CartHeaderChangeHandler = (arg: Partial<B2BCartHeader>) => void;

export const valueChangeHandler = (field: keyof B2BCartHeader, changeHandler: CartHeaderChangeHandler) =>
    (value: string | null): void => {
        switch (field) {
            case 'shipExpireDate':
                if (dayjs(value).isValid()) {
                    switch (dayjs(value).day()) {
                        case 0:
                            changeHandler({
                                [field]: dayjs(value).add(1, 'day').toISOString(),
                            });
                            return;
                        case 6:
                            changeHandler({
                                [field]: dayjs(value).add(2, 'day').toISOString(),
                            })
                            return;
                        // no default
                    }
                }
                changeHandler({
                    [field]: value ?? ''
                })
                return;
            case 'shipVia':
            case 'PaymentType':
                changeHandler({
                    [field]: value ?? ''
                })
                return;
            // no default
        }
    }

export const eventChangeHandler = (field: keyof B2BCartHeader, changeHandler: CartHeaderChangeHandler) =>
    (ev: ChangeEvent<HTMLInputElement>): void => {
        switch (field) {
            case 'customerPONo':
            case 'promoCode':
                changeHandler({
                    [field]: ev.target.value
                })
                return;
            case 'CancelReasonCode':
                changeHandler({
                    [field]: ev.target.checked ? 'HOLD' : ''
                })
                return;
            // no default
        }
    }
