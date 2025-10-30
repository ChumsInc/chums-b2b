import React, {useEffect, useRef} from 'react';
import {selectActiveMessages, selectMessagesLoaded} from "./selectors";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {loadMessages} from "./actions";
import {useIsSSR} from "@/hooks/is-server-side";
import Stack from "@mui/material/Stack";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WebIcon from '@mui/icons-material/Web';
import Typography from "@mui/material/Typography";
import Alert, {type AlertProps} from "@mui/material/Alert";
import type {Message} from "b2b-types";
import Container from "@mui/material/Container";

const messagesMaxAge = 1000 * 60 * 30; //30 minutes

const SiteMessages = () => {
    const dispatch = useAppDispatch();
    const isSSR = useIsSSR();
    const messages = useAppSelector(selectActiveMessages);
    const loaded = useAppSelector(selectMessagesLoaded);
    const timerRef = useRef<number>(0);

    useEffect(() => {
        if (isSSR) {
            return;
        }

        timerRef.current = window.setInterval(() => {
            dispatch(loadMessages());
        }, messagesMaxAge);

        return () => {
            if (isSSR) {
                return;
            }
            window.clearInterval(timerRef.current);
        }
    }, [isSSR, messages, loaded]);

    const refreshHandler = () => {
        dispatch(loadMessages());
    }

    if (!messages.length) {
        return null;
    }

    const alertProps = (message: Message): Pick<AlertProps, 'severity' | 'icon'> => {
        switch (message.type) {
            case 'shipping':
                return {severity: "info", icon: <LocalShippingIcon onClick={refreshHandler}/>};
            case 'site':
                return {severity: 'warning', icon: <WebIcon onClick={refreshHandler}/>};
        }
        return {};
    }

    return (
        <Container>
            <Stack spacing={1} sx={{mb: 5}}>
                {messages.map((message) => (
                    <Alert key={message.id} {...alertProps(message)}>
                        <Typography>{message.message}</Typography>
                    </Alert>
                ))}
            </Stack>
        </Container>
    )
}

export default SiteMessages;
