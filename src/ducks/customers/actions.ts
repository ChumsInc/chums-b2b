import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Customer, UserCustomerAccess} from "b2b-types";
import {fetchCustomerList} from "@/api/customer-list";
import {type RootState} from "@/app/configureStore";
import {selectLoggedIn} from "../user/selectors";
import {selectCustomersStatus} from "./customerListSlice.ts";

export const loadCustomerList = createAsyncThunk<Customer[], UserCustomerAccess | null, { state: RootState }>(
    'customers/list/load',
    async (arg) => {
        return await fetchCustomerList(arg!)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectLoggedIn(state)
                && !!arg?.isRepAccount
                && ['idle', 'fulfilled'].includes(selectCustomersStatus(state));
        }
    }
)
