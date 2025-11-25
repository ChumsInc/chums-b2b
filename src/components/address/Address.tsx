import classNames from "classnames";
import type {CustomerAddress} from "chums-types/b2b";

export interface AddressProps {
    address: CustomerAddress,
    className?: classNames.Argument
}
export default function Address({address, className}: AddressProps) {
    return (
        <address className={classNames(className)}>
            <div>{address.CustomerName ?? ''}</div>
            <AddressLine value={address.AddressLine1}/>
            <AddressLine value={address.AddressLine2}/>
            <AddressLine value={address.AddressLine3}/>
            <AddressCityStateZip address={address} />
            <AddressCountry value={address.CountryCode} />
        </address>
    );
}

function AddressLine({value}: {value: string|null}) {
    if (!value) {
        return null;
    }
    return <div>{value}</div>;
}

function AddressCityStateZip({address}: {address: CustomerAddress}) {
    return (
        <div>{address.City ?? ''},{' '}{address.State ?? ''}{' '}{address.ZipCode ?? ''}</div>
    );
}

function AddressCountry({value}: {value: string|null}) {
    if (!value || ['USA', 'US'].includes(value)) {
        return null;
    }

    return (
        <div>{value}</div>
    );
}
