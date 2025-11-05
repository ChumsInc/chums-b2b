import {createAsyncThunk} from "@reduxjs/toolkit";
import type {Customer, UserCustomerAccess} from "chums-types/b2b";
import {fetchCustomerList} from "@/api/customer-list";
import {type RootState} from "@/app/configureStore";
import {selectLoggedIn} from "../user/userProfileSlice";
import {selectCustomersStatus} from "./customerListSlice";

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
