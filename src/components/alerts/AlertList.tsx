import AppAlert from "@/components/common/AppAlert";
import {dismissAlert, dismissContextAlert} from "@/ducks/alerts/actions";
import {useAppDispatch, useAppSelector} from "@/app/configureStore";
import {selectContextAlerts} from "@/ducks/alerts/selectors";

const AlertList = ({context}: { context?: string }) => {
    const dispatch = useAppDispatch();
    const alerts = useAppSelector((state) => selectContextAlerts(state, context));

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert(id));
    }
    const contextDismissHandler = (context: string) => {
        dispatch(dismissContextAlert(context))
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
