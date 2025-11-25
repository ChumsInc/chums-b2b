import type {Message} from "chums-types/b2b";
import {fetchJSON} from "./fetch";
import debug from "@/utils/debug.ts";

export const fetchMessages = async (): Promise<Message[]> => {
    try {
        const response = await fetchJSON<{ messages: Message[] }>('/api/messages.json', {cache: 'no-cache'});
        return response?.messages ?? [];
    } catch (err) {
        if (err instanceof Error) {
            debug("fetchMessages()", err.message);
            return Promise.reject(err);
        }
        debug("fetchMessages()", err);
        return Promise.reject(new Error('Error in fetchMessages()'));
    }
}
