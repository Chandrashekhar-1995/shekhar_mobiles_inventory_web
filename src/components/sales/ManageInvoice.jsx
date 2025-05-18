import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import ManageInvoiceTable from "./invoiceComponents/ManageInvoiceTable";
import MobileActionButtons from "../dashboard/components/MobileActionButtons";

const ManageInvoice = () => {
    useFetchInvoices();

    return (
        <div className="min-h-screen">
            <div className="p-4">
                <MobileActionButtons/>
            </div>
            <div className="p-4">
                <ManageInvoiceTable />
            </div>
        </div>
    );
};

export default ManageInvoice;
