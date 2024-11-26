import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchRepList} from "@api/user";
import {RootState} from "@app/configureStore";
import {selectIsEmployee, selectIsRep, selectLoggedIn} from "../user/selectors";
import {selectRepsLoading} from "./selectors";
import {Salesperson} from "b2b-types";

export const loadRepList = createAsyncThunk<Salesperson[], void, {state: RootState}>(
    'reps/load',
    async () => {
        return await fetchRepList();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState() ;
            return selectLoggedIn(state)
                && (selectIsEmployee(state) || selectIsRep(state))
                && !selectRepsLoading(state);
        }
    }
)
