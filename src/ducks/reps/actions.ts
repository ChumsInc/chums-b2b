import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchRepList} from "@/api/user";
import type {RootState} from "@/app/configureStore";
import {selectLoggedIn} from "../user/userProfileSlice";
import {selectRepsLoading} from "./salespersonSlice";
import type {Salesperson} from "chums-types/b2b";

export const loadRepList = createAsyncThunk<Salesperson[], void, { state: RootState }>(
    'reps/load',
    async () => {
        return await fetchRepList();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && selectRepsLoading(state) === 'idle';
        }
    }
)
