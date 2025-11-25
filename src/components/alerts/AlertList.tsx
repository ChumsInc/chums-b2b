

import AppAlert from "@/components/common/AppAlert";
import {dismissAlert, dismissContextAlert, selectContextAlerts} from "@/ducks/alerts/alertsSlice";
import {useAppDispatch, useAppSelector} from "@/app/hooks";

const AlertList = ({context}: { context?: string }) => {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector((state) => selectContextAlerts(state, context));

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert(id));
    }
    const contextDismissHandler = (s: string) => {
        dispatch(dismissContextAlert(s))
    }
    return (
        <>
            {alerts.map((alert) => <AppAlert key={alert.alertId}
                                             alertId={alert.alertId}
                                             severity={alert.severity}
                                             count={alert.count}
                                             context={alert.context}
                                             title={alert.title}
                                             message={alert.message}
                                             onDismiss={dismissHandler}
                                             onDismissContext={contextDismissHandler}
            />)}
        </>
    )
}

export default AlertList;
