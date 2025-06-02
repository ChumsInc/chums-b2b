import React, {useEffect, useId} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectCustomersStateFilter, selectCustomerStates} from "../selectors";
import StateSelect from "../../../components/StateSelect";
import {setCustomersStateFilter} from "../actions";

const AccountListStateFilter = () => {
    const dispatch = useAppDispatch();
    const states = useAppSelector(selectCustomerStates);
    const stateFilter = useAppSelector(selectCustomersStateFilter);
    const id = useId();
    const [list, setList] = React.useState<string[]>([]);

    useEffect(() => {
        if (stateFilter && !states.includes(stateFilter)) {
            setList([...states, stateFilter]);
        } else {
            setList(states);
        }
    }, [states, stateFilter]);


    const changeHandler = (state:string) => {
        dispatch(setCustomersStateFilter(state));
    }

    if (states.length < 2) {
        return null;
    }
    return (
        <StateSelect countryCode="USA" value={stateFilter} filterList={list} allowAllStates id={id}
                     variant="standard" onChange={changeHandler} />
    )
}

export default AccountListStateFilter;
