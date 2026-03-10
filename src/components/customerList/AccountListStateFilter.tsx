import {useId} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {
    selectCustomersStateFilter,
    selectCustomerStates,
    setCustomersStateFilter
} from "@/ducks/customers/customerListSlice";
import StateSelect from "../address/StateSelect.tsx";

const minStates = 1;

const AccountListStateFilter = () => {
    const dispatch = useAppDispatch();
    const states = useAppSelector(selectCustomerStates);
    const stateFilter = useAppSelector(selectCustomersStateFilter);
    const id = useId();

    const changeHandler = (state: string) => {
        dispatch(setCustomersStateFilter(state));
    }

    const list = stateFilter && !states.includes(stateFilter) ? [...states, stateFilter] : states;

    if (list.length <= minStates) {
        return null;
    }
    return (
        <StateSelect countryCode="USA" value={stateFilter} filterList={list} allowAllStates id={id}
                     variant="standard" onChange={changeHandler}/>
    )
}

export default AccountListStateFilter;
