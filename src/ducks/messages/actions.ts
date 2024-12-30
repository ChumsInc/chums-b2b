import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchMessages} from "@api/messages";
import {RootState} from "@app/configureStore";
import {selectMessagesLoading} from "./selectors";
import {LoadMessagesResponse} from "./index";

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
        condition: (arg, {getState}) => {
            const state = getState() ;
            return !selectMessagesLoading(state);
        }
    }
)
