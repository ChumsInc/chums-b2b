

import {useEffect, useId, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/app/hooks";
import {selectCustomersStateFilter, selectCustomerStates, setCustomersStateFilter} from "@/ducks/customers/customerListSlice";
import StateSelect from "../address/StateSelect.tsx";

const minStates = 1;

const AccountListStateFilter = () => {
    const dispatch = useAppDispatch();
    const states = useAppSelector(selectCustomerStates);
    const stateFilter = useAppSelector(selectCustomersStateFilter);
    const id = useId();
    const [list, setList] = useState<string[]>([]);

    useEffect(() => {
        if (stateFilter && !states.includes(stateFilter)) {
            setList([...states, stateFilter]);
        } else {
            setList(states);
        }
    }, [states, stateFilter]);


    const changeHandler = (state: string) => {
        dispatch(setCustomersStateFilter(state));
    }

    if (states.length <= minStates) {
        return null;
    }
    return (
        <StateSelect countryCode="USA" value={stateFilter} filterList={list} allowAllStates id={id}
                     variant="standard" onChange={changeHandler}/>
    )
}

export default AccountListStateFilter;
