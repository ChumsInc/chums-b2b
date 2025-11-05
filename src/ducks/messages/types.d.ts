import type {Message} from "chums-types/b2b";

export interface MessagesState {
    list: Message[],
    loading: boolean;
}
