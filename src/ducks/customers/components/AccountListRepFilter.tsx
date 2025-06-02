import React from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCustomersRepFilter} from "../selectors";
import {setCustomersRepFilter} from "../actions";
import RepSelect from "../../reps/components/RepSelect";
import {selectCanFilterReps} from "../../user/selectors";

const AccountListRepFilter = () => {
    const dispatch = useAppDispatch();
    const repFilter = useAppSelector(selectCustomersRepFilter);
    const allowSelectReps = useAppSelector(selectCanFilterReps);

    const repChangeHandler = (value: string | null) => {
        dispatch(setCustomersRepFilter(value));
    }

    if (!allowSelectReps) {
        return null;
    }

    return (
        <RepSelect value={repFilter} onChange={repChangeHandler}/>
    )
}

export default AccountListRepFilter;
