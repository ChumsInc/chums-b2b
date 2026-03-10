import {createAsyncThunk} from "@reduxjs/toolkit";
import type {UserCustomerAccess} from "chums-types/b2b";
import {fetchCustomerList} from "@/api/customer-list";
import {selectLoggedIn} from "../user/userProfileSlice";
import {selectCustomersStatus} from "./customerListSlice";
import type {RootState} from "@/app/configureStore";
import type {ListedCustomer} from "@/ducks/customers/types.ts";

export const loadCustomerList = createAsyncThunk<ListedCustomer[], UserCustomerAccess | null, { state: RootState }>(
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
