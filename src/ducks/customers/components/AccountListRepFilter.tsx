import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCustomersRepFilter, setCustomersRepFilter} from "../customerListSlice.ts";
import RepSelect from "../../reps/components/RepSelect";
import {selectCanFilterReps} from "@/ducks/user/userAccessSlice.ts";

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
