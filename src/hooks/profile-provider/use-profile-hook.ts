import {useContext} from "react";
import {ProfileContext, type ProfileContextState} from "@/hooks/profile-provider/ProfileContext.tsx";

export const useProfile = () => {
    const context = useContext(ProfileContext) as ProfileContextState;
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider');
    }
    return context;
}
