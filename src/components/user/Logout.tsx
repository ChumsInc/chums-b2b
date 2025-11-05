'use client';

import {useEffect} from 'react';
import {useAppDispatch} from "@/app/configureStore";
import {logoutUser} from "@/ducks/user/actions";
import {useNavigate} from "react-router";

export default function Logout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutUser())
            .then(() => {
                navigate('/login');
            })
    }, [dispatch, navigate]);

    return (
        <div>Logging out.</div>
    );
}
