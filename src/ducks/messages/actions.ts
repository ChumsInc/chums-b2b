import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMessages} from "@/api/messages.js";
import {type RootState} from "@/app/configureStore.js";
import {selectMessagesLoading} from "./selectors.js";
import type {LoadMessagesResponse} from "./index.js";

export const loadMessages = createAsyncThunk<LoadMessagesResponse, void, {state: RootState}>(
    'messages/load',
    async () => {
        const messages = await fetchMessages();
        return {
            list: messages,
            loaded: new Date().valueOf(),
        }
    },
    {
        condition: (_, {getState}) => {
            const state = getState() ;
            return !selectMessagesLoading(state);
        }
    }
)
