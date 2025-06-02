import React, {useEffect} from "react";
import {Navigate} from "react-router";
import {useAppDispatch} from "@/app/configureStore";
import {loadKeywordsIfNeeded} from "../../keywords/actions";

export default function ProductRouter() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadKeywordsIfNeeded());
    }, []);

    return (
        <Navigate to="/products/all"/>
    )
}

