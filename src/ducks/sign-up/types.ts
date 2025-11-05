import type {UserProfile} from "chums-types/b2b";

export type SignUpProfile = Pick<UserProfile, 'id'|'email'|'name'|'accountType'>;

export interface LoadProfileProps {
    key: string;
    hash: string;
}
