import {useAppSelector} from "@/app/hooks";
import {selectCurrentInvoiceTracking} from "@/ducks/invoices/currentInvoiceSlice";
import Alert from "@mui/material/Alert";
import TrackingLinkBadge from "@/components/invoices/TrackingLinkBadge.tsx";

export default function InvoiceTracking() {
    const tracking = useAppSelector(selectCurrentInvoiceTracking);
    if (!tracking.length) {
        return (
            <Alert severity="info">Tracking is not available for this invoice.</Alert>
        )
    }
    return (
        <div>
            {tracking.map(track => (
                <TrackingLinkBadge key={track.PackageNo}
                                   trackingId={track.TrackingID}
                                   shipVia={track.StarshipShipVia} weight={track.Weight}/>)
            )}
        </div>
    )

}
