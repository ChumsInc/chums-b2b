'use client';

import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCustomersRepFilter, setCustomersRepFilter} from "@/ducks/customers/customerListSlice";
import RepSelect from "@/ducks/reps/components/RepSelect";
import {selectCanFilterReps} from "@/ducks/user/userAccessSlice";

const AccountListRepFilter = () => {
    const dispatch = useAppDispatch();
    const repFilter = useAppSelector(selectCustomersRepFilter);
    const allowSelectReps = useAppSelector(selectCanFilterReps);

    const repChangeHandler = (value: string | null) => {
        dispatch(setCustomersRepFilter(value ?? ''));
    }

    if (!allowSelectReps) {
        return null;
    }

    return (
        <RepSelect value={repFilter} onChange={repChangeHandler}/>
    )
}

export default AccountListRepFilter;
