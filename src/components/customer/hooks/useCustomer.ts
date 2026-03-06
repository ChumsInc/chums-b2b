import {CustomerContext, type CustomerContextState} from "@/components/customer/CustomerContext.tsx";
import {useContext} from "react";

const useCustomer = ():CustomerContextState => {
    const context = useContext(CustomerContext) as CustomerContextState;
    if (!context) {
        throw new Error('useCustomer must be used within a CustomerProvider');
    }
    return context;
}

export default useCustomer;
