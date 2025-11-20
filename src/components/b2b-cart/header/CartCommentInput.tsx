'use client';

import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {addToCart} from "@/ducks/carts/actions";
import {selectCustomerKey} from "@/ducks/customer/currentCustomerSlice";

export interface CartCommentInputProps {
    cartId: number;
    disabled?: boolean;
}

export default function CartCommentInput({cartId, disabled}: CartCommentInputProps) {
    const dispatch = useAppDispatch();
    const customerKey = useAppSelector(selectCustomerKey);
    const [text, setText] = useState<string>('');

    useEffect(() => {
        setText('');
    }, [cartId])

    const saveHandler = async () => {
        if (!customerKey || !text.trim()) {
            return;
        }
        await dispatch(addToCart({
            customerKey,
            cartId,
            item: {
                itemType: '4',
                itemCode: '/C',
                commentText: text.trim(),
                quantityOrdered: 0,
                unitOfMeasure: null
            }
        }));
        setText('');
    }

    return (
        <Stack spacing={1} direction="row" sx={{flex: '1 1 auto'}}>
            <TextField label="Add Cart Comment" value={text} onChange={(ev) => setText(ev.target.value)}
                       variant="filled" size="small" multiline fullWidth/>
            <Button color="primary" variant="text" type="button" size="small"
                    onClick={saveHandler}
                    disabled={!text || disabled}>
                Save
            </Button>
        </Stack>
    )
}
