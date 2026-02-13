import {
    createEntityAdapter,
    createSelector,
    createSlice,
    isFulfilled,
    isRejected,
    type PayloadAction
} from "@reduxjs/toolkit";
import {setLoggedIn} from "../user/actions";
import {alertSorter} from "./utils";
import type {B2BContextAlert} from "@/ducks/alerts/types";

const adapter = createEntityAdapter<B2BContextAlert, number>({
    selectId: (arg) => arg.alertId,
    sortComparer: (a, b) => a.alertId - b.alertId,
})

const selectors = adapter.getSelectors();

export interface AlertsState {
    index: number;
}

const extraState: AlertsState = {
    index: 0,
}

const alertsSlice = createSlice({
    name: 'alerts',
    initialState: adapter.getInitialState(extraState),
    reducers: {
        setAlert: (state, action: PayloadAction<Omit<B2BContextAlert, 'alertId' | 'count'>>) => {
            const nextIndex = state.index + 1;
            if (action.payload.context) {
                const alert = Object.values(state.entities).find(_alert => _alert.context === action.payload.context);
                if (!alert) {
                    adapter.addOne(state, {...action.payload, alertId: nextIndex, count: 1})
                    state.index = nextIndex;
                } else {
                    adapter.updateOne(state, {changes: {count: (alert.count ?? 0) + 1}, id: alert.alertId})
                }
            } else {
                adapter.addOne(state, {...action.payload, alertId: nextIndex, count: 1})
                state.index = nextIndex;
            }
        },
        dismissAlert: (state, action: PayloadAction<number>) => {
            adapter.removeOne(state, action.payload);
        },
        dismissContextAlert: (state, action: PayloadAction<string>) => {
            const alert = Object.values(state.entities).find(_alert => _alert.context === action.payload);
            adapter.removeOne(state, alert?.alertId ?? 0);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(setLoggedIn, (state, action) => {
                if (!action.payload?.loggedIn) {
                    adapter.removeAll(state);
                }
            })
            .addMatcher(isRejected, (state, action) => {
                const nextIndex = state.index + 1;
                const context = action.type.replace('/rejected', '');
                const alert = Object.values(state.entities).find(_alert => _alert.context === context);
                if (alert) {
                    adapter.updateOne(state, {changes: {count: (alert.count ?? 0) + 1}, id: alert.alertId})
                } else {
                    adapter.addOne(state, {
                        alertId: nextIndex,
                        severity: 'warning',
                        message: action.error.message?.replace('\x8a', '') ?? '',
                        context,
                        count: 1
                    });
                    state.index = nextIndex;
                }
            })
            .addMatcher((action) => isFulfilled(action as PayloadAction),
                (state, action) => {
                    const context = action.type.replace('/fulfilled', '');
                    const alert = Object.values(state.entities).find(_alert => _alert.context === context);
                    if (alert) {
                        adapter.removeOne(state, alert.alertId);
                    }
                })
    },
    selectors: {
        selectAlerts: (state) => selectors.selectAll(state),
    }
});

export default alertsSlice;

export const {dismissAlert, dismissContextAlert} = alertsSlice.actions;
export const {selectAlerts} = alertsSlice.selectors;

export const selectContextAlerts = createSelector(
    [selectAlerts, (_, context?: string) => context],
    (list, context) => {
        return list.filter(alert => !context || alert.context === context).sort(alertSorter);
    }
)
