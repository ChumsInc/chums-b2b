import {useParams} from "react-router";
import useCustomer from "@/hooks/customer/useCustomer.ts";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/app/hooks.ts";
import {selectCanEdit} from "@/ducks/user/userProfileSlice.ts";
import LinearProgress from "@mui/material/LinearProgress";
import DeliveryAddress from "@/components/address/DeliveryAddress.tsx";
import AddressSkeleton from "@/components/address/AddressSkeleton.tsx";
import EditorProvider from "@/hooks/editor/EditorProvider.tsx";
import ShipToForm from "@/components/customer/delivery/ShipToForm.tsx";
import {saveShipToAddress} from "@/ducks/customer/actions.ts";
import type {ShipToCustomer} from "chums-types/b2b";

export default function ShipToCustomerPanel() {
    const dispatch = useAppDispatch();
    const params = useParams<'shipToCode'>();
    const {status, shipTo, setShipTo} = useCustomer();
    const canEdit = useAppSelector(selectCanEdit);

    useEffect(() => {
        if (params.shipToCode && params.shipToCode !== shipTo?.ShipToCode) {
            setShipTo(params.shipToCode);
        }
    }, [params, shipTo, setShipTo]);

    const submitHandler = (arg: ShipToCustomer) => {
        if (!shipTo || !canEdit) {
            return;
        }
        dispatch(saveShipToAddress(arg));
    }

    if (!canEdit) {
        return (
            <div>
                <h4>Delivery Address</h4>
                {status === 'loading' && <LinearProgress variant="indeterminate"/>}
                {!shipTo && <AddressSkeleton/>}
                {shipTo && <DeliveryAddress address={shipTo}/>}
            </div>
        )
    }

    return (
        <div>
            {(status === 'loading' || status === 'saving') && <LinearProgress variant="indeterminate"/>}
            {shipTo && (
                <EditorProvider initialValue={shipTo}>
                    <ShipToForm onSave={submitHandler} readOnly={!canEdit}/>
                </EditorProvider>
            )}
        </div>
    )
}
