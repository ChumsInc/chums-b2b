import {useEffect} from 'react';
import {useAppDispatch} from "@/app/hooks";
import {useLocation} from "react-router";
import AccountList from "./AccountList";
import {setReturnToPath} from "@/ducks/customer/actions";

export default function AccountListContainer(){
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        // @TODO: is there a better way to do this?
        if (location.state?.returnTo) {
            dispatch(setReturnToPath(location.state.returnTo));
        }
    }, []);

    return (
        <AccountList/>
    );
}
